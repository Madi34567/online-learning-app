let currentUser = null;
let currentTestId = null;
let currentTestQuestions = [];
let testStartTime = null;
let timerInterval = null;
let loadedTests = [];

const testDesign = {
    HTML: {
        icon: '/html.png',
        color: '#f97316',
        text: 'Проверьте знания структуры и тегов HTML'
    },
    CSS: {
        icon: '/css.png',
        color: '#0ea5e9',
        text: 'Проверьте навыки работы со стилями и макетами'
    },
    JavaScript: {
        icon: '/javascript.png',
        color: '#eab308',
        text: 'Проверьте знания языка JavaScript'
    },
    PostgreSQL: {
        icon: '/postgresql.png',
        color: '#2563eb',
        text: 'Проверьте знания работы с базой данных PostgreSQL'
    },
    NodeJS: {
        icon: '/nodejs.png',
        color: '#22c55e',
        text: 'Проверьте знания платформы Node.js'
    },
    SQL: {
        icon: '/sql.png',
        color: '#a855f7',
        text: 'Проверьте навыки написания SQL-запросов'
    },
    Python: {
        icon: '/python.png',
        color: '#3776ab',
        text: 'Проверьте знания языка Python'
    }
};

function openAuthModal(mode) {
    document.getElementById('authModal').classList.remove('hidden');
    switchAuthMode(mode);
}

function closeAuthModal() {
    document.getElementById('authModal').classList.add('hidden');
}

function switchAuthMode(mode) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');

    document.getElementById('loginMessage').innerText = '';
    document.getElementById('registerMessage').innerText = '';
    document.getElementById('loginMessage').className = 'message';
    document.getElementById('registerMessage').className = 'message';

    if (mode === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
    } else {
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
    }
}

function escapeHTML(text) {
    return String(text)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function scrollToBlock(id) {
    const block = document.getElementById(id);

    if (block) {
        block.scrollIntoView({ behavior: 'smooth' });
    }
}

function getDesign(courseTitle) {
    const title = String(courseTitle || '').toLowerCase();

    if (title.includes('html')) {
        return testDesign.HTML;
    }

    if (title.includes('css')) {
        return testDesign.CSS;
    }

    if (title.includes('javascript') || title.includes('java script') || title === 'js') {
        return testDesign.JavaScript;
    }

    if (title.includes('postgresql') || title.includes('postgres')) {
        return testDesign.PostgreSQL;
    }

    if (title.includes('node')) {
        return testDesign.NodeJS;
    }

    if (title.includes('python')) {
        return testDesign.Python;
    }

    if (title.includes('sql')) {
        return testDesign.SQL;
    }

    return {
        icon: '/html.png',
        color: '#3157ff',
        text: 'Проверьте свои знания'
    };
}

function getIcon(courseTitle) {
    const design = getDesign(courseTitle);
    return `<img src="${design.icon}" alt="${escapeHTML(courseTitle)}">`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

function setUserInterface(user) {
    const firstName = user.full_name.split(' ')[0];
    const firstLetter = firstName.charAt(0).toUpperCase();

    document.getElementById('helloName').innerText = `Привет, ${firstName}! 👋`;
    document.getElementById('avatarLetter').innerText = firstLetter;

    document.getElementById('guestActions').classList.add('hidden');
    document.getElementById('userProfile').classList.remove('hidden');
    document.getElementById('headerAvatar').innerText = firstLetter;
    document.getElementById('headerUserName').innerText = firstName;
}

function setupDashboardMenu() {
    const items = document.querySelectorAll('.side-item');

    items.forEach(item => {
        item.addEventListener('click', () => {
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const target = item.dataset.target;
            const action = item.dataset.action;

            if (target) {
                scrollToBlock(target);
            }

            if (action === 'favorite') {
                alert('Избранное: здесь можно будет сохранять нужные тесты.');
            }

            if (action === 'settings') {
                alert('Настройки: здесь можно будет изменить профиль и пароль.');
            }
        });
    });
}

async function registerUser() {
    const full_name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    const message = document.getElementById('registerMessage');
    message.className = 'message';

    if (!full_name || !email || !password) {
        message.innerText = 'Заполните все поля';
        message.classList.add('error');
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ full_name, email, password })
        });

        const data = await response.json();

        if (data.user) {
            message.innerText = 'Регистрация успешна. Теперь войдите в аккаунт.';
            message.classList.add('success');

            document.getElementById('regName').value = '';
            document.getElementById('regEmail').value = '';
            document.getElementById('regPassword').value = '';

            setTimeout(() => {
                switchAuthMode('login');
                document.getElementById('loginEmail').value = email;
            }, 900);
        } else {
            message.innerText = data.message || 'Ошибка регистрации';
            message.classList.add('error');
        }
    } catch (error) {
        message.innerText = 'Ошибка соединения с сервером';
        message.classList.add('error');
    }
}

async function loginUser() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const message = document.getElementById('loginMessage');
    message.className = 'message';

    if (!email || !password) {
        message.innerText = 'Введите email и пароль';
        message.classList.add('error');
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.user) {
            currentUser = data.user;
            setUserInterface(currentUser);

            message.innerText = 'Вход выполнен успешно';
            message.classList.add('success');

            await loadDashboard();
            await loadResults();

            setTimeout(() => {
                closeAuthModal();
                scrollToBlock('tests');
            }, 700);
        } else {
            message.innerText = data.message || 'Ошибка входа';
            message.classList.add('error');
        }
    } catch (error) {
        message.innerText = 'Ошибка соединения с сервером';
        message.classList.add('error');
    }
}

async function loadTests() {
    const testsList = document.getElementById('testsList');
    testsList.innerHTML = '';

    try {
        const response = await fetch('/api/tests');
        loadedTests = await response.json();

        loadedTests.forEach(test => {
            const design = getDesign(test.course_title);

            testsList.innerHTML += `
                <div class="test-card" style="--accent: ${design.color}" onclick="openTest(${test.id})">
                    <div class="test-icon">${getIcon(test.course_title)}</div>
                    <h3>${escapeHTML(test.title)}</h3>
                    <p>${escapeHTML(design.text)}</p>
                    <div class="test-meta">☷ ${test.question_count} вопросов</div>
                    <button class="btn" onclick="event.stopPropagation(); openTest(${test.id})">Пройти тест</button>
                </div>
            `;
        });

        renderProgressChart([]);
        renderDonutChart([]);
    } catch (error) {
        testsList.innerHTML = '<p>Не удалось загрузить тесты</p>';
    }
}

async function openTest(testId) {
    currentTestId = testId;

    try {
        const response = await fetch(`/api/test/${testId}`);
        const data = await response.json();

        currentTestQuestions = data.questions;
        const test = data.test;
        const design = getDesign(test.course_title);

        renderTest(test, currentTestQuestions, design);

        testStartTime = new Date();
        startTimer();

        scrollToBlock('testPanel');
    } catch (error) {
        document.getElementById('testPanel').innerHTML = `
            <div class="empty-test">
                <h2>Ошибка</h2>
                <p>Не удалось загрузить выбранный тест.</p>
            </div>
        `;
    }
}

function renderTest(test, questions, design) {
    const testPanel = document.getElementById('testPanel');

    let questionsHtml = '';

    questions.forEach((question, index) => {
        let answersHtml = '';

        question.answers.forEach(answer => {
            answersHtml += `
                <label class="answer-option">
                    <input 
                        type="radio" 
                        name="question_${question.id}" 
                        value="${answer.id}"
                        onchange="updateProgress()"
                    >
                    <span>${escapeHTML(answer.answer_text)}</span>
                </label>
            `;
        });

        questionsHtml += `
            <div class="question-card">
                <h3>${index + 1}. ${escapeHTML(question.question_text)}</h3>
                ${answersHtml}
            </div>
        `;
    });

    testPanel.innerHTML = `
        <div class="selected-header">
            <div class="test-icon">
                <img src="${design.icon}" alt="icon">
            </div>
            <div>
                <h2>Выбранный тест: ${escapeHTML(test.title)}</h2>
                <p class="muted">${questions.length} вопросов. Выберите по одному ответу на каждый вопрос.</p>
            </div>
        </div>

        <div class="test-body">
            <div class="test-side">
                <div class="progress-label">Прогресс</div>
                <div class="progress-small" id="progressText">0 из ${questions.length} вопросов</div>
                <div class="progress-line">
                    <span id="progressBar"></span>
                </div>

                <div class="timer-box">
                    <strong>Время теста</strong>
                    <div class="timer" id="timer">00:00</div>
                </div>
            </div>

            <div class="questions-area">
                ${questionsHtml}

                <div class="submit-area">
                    <button class="btn primary big" onclick="submitTest()">Завершить тест</button>
                </div>

                <div id="finalResult"></div>
            </div>
        </div>
    `;
}

function updateProgress() {
    const answered = document.querySelectorAll('.question-card input[type="radio"]:checked').length;
    const total = currentTestQuestions.length;
    const percent = total > 0 ? Math.round((answered / total) * 100) : 0;

    const progressText = document.getElementById('progressText');
    const progressBar = document.getElementById('progressBar');

    if (progressText && progressBar) {
        progressText.innerText = `${answered} из ${total} вопросов`;
        progressBar.style.width = `${percent}%`;
    }
}

function startTimer() {
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!testStartTime) return;

        const now = new Date();
        const diff = Math.floor((now - testStartTime) / 1000);

        const minutes = String(Math.floor(diff / 60)).padStart(2, '0');
        const seconds = String(diff % 60).padStart(2, '0');

        const timer = document.getElementById('timer');

        if (timer) {
            timer.innerText = `${minutes}:${seconds}`;
        }
    }, 1000);
}

async function submitTest() {
    if (!currentUser) {
        alert('Сначала войдите в систему');
        openAuthModal('login');
        return;
    }

    if (!currentTestId) {
        alert('Сначала выберите тест');
        return;
    }

    const selectedAnswers = [];

    currentTestQuestions.forEach(question => {
        const selected = document.querySelector(`input[name="question_${question.id}"]:checked`);

        if (selected) {
            selectedAnswers.push({
                question_id: question.id,
                answer_id: Number(selected.value)
            });
        }
    });

    if (selectedAnswers.length < currentTestQuestions.length) {
        const confirmFinish = confirm(
            `Вы ответили на ${selectedAnswers.length} из ${currentTestQuestions.length} вопросов. Завершить тест?`
        );

        if (!confirmFinish) {
            return;
        }
    }

    try {
        const response = await fetch('/api/submit-test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: currentUser.id,
                test_id: currentTestId,
                answers: selectedAnswers
            })
        });

        const data = await response.json();

        clearInterval(timerInterval);

        document.getElementById('finalResult').innerHTML = `
            <div class="final-result">
                ${escapeHTML(data.message)}: ${data.score} из ${data.totalQuestions}. Итоговый результат: ${data.percentage}%
            </div>
        `;

        await loadDashboard();
        await loadResults();
    } catch (error) {
        alert('Ошибка при отправке теста');
    }
}

async function loadDashboard() {
    if (!currentUser) return;

    try {
        const dashboardResponse = await fetch(`/api/dashboard/${currentUser.id}`);
        const dashboard = await dashboardResponse.json();

        document.getElementById('completedTests').innerText = dashboard.stats.completed_tests || 0;
        document.getElementById('averageResult').innerText = `${dashboard.stats.average_percentage || 0}%`;
        document.getElementById('bestResult').innerText = `${dashboard.stats.best_percentage || 0}%`;

        const resultsResponse = await fetch(`/api/results/${currentUser.id}`);
        const results = await resultsResponse.json();

        renderProgressChart(results);
        renderDonutChart(results);
    } catch (error) {
        console.log('Ошибка загрузки аналитики');
    }
}

async function loadResults() {
    const resultsList = document.getElementById('resultsList');

    if (!currentUser) {
        resultsList.innerHTML = '<p class="muted">Войдите в аккаунт, чтобы увидеть результаты.</p>';
        renderProgressChart([]);
        renderDonutChart([]);
        return;
    }

    try {
        const response = await fetch(`/api/results/${currentUser.id}`);
        const results = await response.json();

        renderProgressChart(results);
        renderDonutChart(results);

        if (results.length === 0) {
            resultsList.innerHTML = '<p class="muted">Пока нет пройденных тестов.</p>';
            return;
        }

        resultsList.innerHTML = '';

        results.slice(0, 7).forEach(result => {
            const design = getDesign(result.course_title);

            resultsList.innerHTML += `
                <div class="result-item" onclick="openLatestTestByCourse('${escapeHTML(result.course_title)}')">
                    <div class="result-mini-icon">
                        <img src="${design.icon}" alt="${escapeHTML(result.course_title)}">
                    </div>

                    <div>
                        <h4>${escapeHTML(result.test_title)}</h4>
                        <p>${result.score} из ${result.total_questions} • ${formatDate(result.created_at)}</p>
                    </div>

                    <div class="result-score">${result.percentage}%</div>
                </div>
            `;
        });
    } catch (error) {
        resultsList.innerHTML = '<p class="muted">Не удалось загрузить результаты.</p>';
    }
}

function openLatestTestByCourse(courseTitle) {
    const test = loadedTests.find(item => {
        return String(item.course_title).toLowerCase() === String(courseTitle).toLowerCase();
    });

    if (test) {
        openTest(test.id);
    }
}

function getBestResultsByCourse(results) {
    const best = {};

    loadedTests.forEach(test => {
        best[test.course_title] = {
            course_title: test.course_title,
            percentage: 0,
            score: 0,
            total_questions: Number(test.question_count) || 20
        };
    });

    results.forEach(result => {
        const course = result.course_title;

        if (!best[course] || Number(result.percentage) > Number(best[course].percentage)) {
            best[course] = {
                course_title: course,
                percentage: Number(result.percentage),
                score: Number(result.score),
                total_questions: Number(result.total_questions)
            };
        }
    });

    return Object.values(best);
}

function renderProgressChart(results) {
    const chart = document.getElementById('progressChart');

    if (!chart) return;

    const data = getBestResultsByCourse(results);

    chart.innerHTML = '';

    data.forEach(item => {
        const design = getDesign(item.course_title);
        const percent = Number(item.percentage);
        const height = percent > 0 ? Math.max(percent, 8) : 2;

        chart.innerHTML += `
            <div class="bar-item" title="${escapeHTML(item.course_title)} — ${percent}%">
                <div class="bar-value">${percent}%</div>
                <div class="bar-column">
                    <span style="height: ${height}%; background: linear-gradient(180deg, ${design.color}, rgba(49, 87, 255, 0.25));"></span>
                </div>
                <div class="bar-label">${escapeHTML(item.course_title)}</div>
            </div>
        `;
    });
}

function renderDonutChart(results) {
    const donut = document.getElementById('donutChart');
    const legend = document.getElementById('donutLegend');

    if (!donut || !legend) return;

    const data = getBestResultsByCourse(results).filter(item => Number(item.percentage) > 0);

    if (data.length === 0) {
        donut.style.background = 'conic-gradient(#e5e7eb 0 100%)';
        legend.innerHTML = '<li>Нет данных</li>';
        return;
    }

    const total = data.reduce((sum, item) => sum + Number(item.percentage), 0);

    let current = 0;
    const segments = [];

    legend.innerHTML = '';

    data.forEach(item => {
        const design = getDesign(item.course_title);
        const part = total > 0 ? (Number(item.percentage) / total) * 100 : 0;
        const start = current;
        const end = current + part;

        segments.push(`${design.color} ${start}% ${end}%`);
        current = end;

        legend.innerHTML += `
            <li>
                <b style="background:${design.color}"></b>
                ${escapeHTML(item.course_title)} — ${item.percentage}%
            </li>
        `;
    });

    donut.style.background = `conic-gradient(${segments.join(', ')})`;
}

loadTests();
setupDashboardMenu();