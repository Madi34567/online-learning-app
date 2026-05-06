const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Отдаём файлы сайта из корня проекта
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/check', (req, res) => {
    res.json({ message: 'API is running successfully!' });
});

app.post('/api/register', async (req, res) => {
    try {
        const { full_name, email, password } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const existingUser = await pool.query(
            'SELECT id FROM users WHERE email = $1',
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING id, full_name, email, role',
            [full_name, email, hashedPassword]
        );

        res.json({
            message: 'Регистрация успешна',
            user: newUser.rows[0]
        });
    } catch (error) {
        console.error('Ошибка /api/register:', error);
        res.status(500).json({ message: 'Ошибка регистрации' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Пользователь не найден' });
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        res.json({
            message: 'Вход выполнен успешно',
            user: {
                id: user.rows[0].id,
                full_name: user.rows[0].full_name,
                email: user.rows[0].email,
                role: user.rows[0].role
            }
        });
    } catch (error) {
        console.error('Ошибка /api/login:', error);
        res.status(500).json({ message: 'Ошибка входа' });
    }
});

app.get('/api/tests', async (req, res) => {
    try {
        const tests = await pool.query(`
            SELECT 
                tests.id,
                tests.title,
                courses.title AS course_title,
                courses.description,
                COUNT(questions.id)::int AS question_count
            FROM tests
            JOIN courses ON tests.course_id = courses.id
            LEFT JOIN questions ON questions.test_id = tests.id
            GROUP BY tests.id, tests.title, courses.title, courses.description
            ORDER BY tests.id
        `);

        res.json(tests.rows);
    } catch (error) {
        console.error('Ошибка /api/tests:', error);
        res.status(500).json({ message: 'Ошибка получения тестов' });
    }
});

app.get('/api/test/:id', async (req, res) => {
    try {
        const testId = req.params.id;

        const testInfo = await pool.query(`
            SELECT 
                tests.id,
                tests.title,
                courses.title AS course_title,
                courses.description
            FROM tests
            JOIN courses ON tests.course_id = courses.id
            WHERE tests.id = $1
        `, [testId]);

        if (testInfo.rows.length === 0) {
            return res.status(404).json({ message: 'Тест не найден' });
        }

        const questions = await pool.query(
            'SELECT * FROM questions WHERE test_id = $1 ORDER BY id',
            [testId]
        );

        const result = [];

        for (const question of questions.rows) {
            const answers = await pool.query(
                'SELECT id, answer_text FROM answers WHERE question_id = $1 ORDER BY id',
                [question.id]
            );

            result.push({
                id: question.id,
                question_text: question.question_text,
                answers: answers.rows
            });
        }

        res.json({
            test: testInfo.rows[0],
            questions: result
        });
    } catch (error) {
        console.error('Ошибка /api/test/:id:', error);
        res.status(500).json({ message: 'Ошибка получения теста' });
    }
});

app.post('/api/submit-test', async (req, res) => {
    try {
        const { user_id, test_id, answers } = req.body;

        if (!user_id || !test_id || !answers || answers.length === 0) {
            return res.status(400).json({ message: 'Недостаточно данных для проверки теста' });
        }

        let score = 0;
        const totalQuestions = answers.length;

        for (const item of answers) {
            const correctAnswer = await pool.query(
                'SELECT id FROM answers WHERE id = $1 AND is_correct = TRUE',
                [item.answer_id]
            );

            if (correctAnswer.rows.length > 0) {
                score++;
            }
        }

        const percentage = Math.round((score / totalQuestions) * 100);

        await pool.query(
            'INSERT INTO results (user_id, test_id, score, total_questions, percentage) VALUES ($1, $2, $3, $4, $5)',
            [user_id, test_id, score, totalQuestions, percentage]
        );

        res.json({
            message: 'Тест завершён',
            score,
            totalQuestions,
            percentage
        });
    } catch (error) {
        console.error('Ошибка /api/submit-test:', error);
        res.status(500).json({ message: 'Ошибка сохранения результата' });
    }
});

app.get('/api/results/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const results = await pool.query(`
            SELECT 
                results.id,
                results.score,
                results.total_questions,
                results.percentage,
                results.created_at,
                tests.title AS test_title,
                courses.title AS course_title
            FROM results
            JOIN tests ON results.test_id = tests.id
            JOIN courses ON tests.course_id = courses.id
            WHERE results.user_id = $1
            ORDER BY results.created_at DESC
        `, [userId]);

        res.json(results.rows);
    } catch (error) {
        console.error('Ошибка /api/results/:userId:', error);
        res.status(500).json({ message: 'Ошибка получения результатов' });
    }
});

app.get('/api/dashboard/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        const stats = await pool.query(`
            SELECT 
                COUNT(*)::int AS completed_tests,
                COALESCE(ROUND(AVG(percentage)), 0)::int AS average_percentage,
                COALESCE(MAX(percentage), 0)::int AS best_percentage
            FROM results
            WHERE user_id = $1
        `, [userId]);

        res.json({
            stats: stats.rows[0]
        });
    } catch (error) {
        console.error('Ошибка /api/dashboard/:userId:', error);
        res.status(500).json({ message: 'Ошибка получения аналитики' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});