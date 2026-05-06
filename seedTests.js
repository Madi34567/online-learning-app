const pool = require('./db');

const testsData = [
    {
        courseTitle: 'HTML',
        courseDescription: 'Основы языка разметки HTML',
        testTitle: 'Тест по HTML',
        questions: [
            ['Что такое HTML?', ['Язык разметки веб-страниц', 'Язык программирования', 'База данных', 'Операционная система']],
            ['Какой тег используется для заголовка первого уровня?', ['<h1>', '<p>', '<div>', '<span>']],
            ['Какой тег используется для абзаца?', ['<p>', '<a>', '<img>', '<table>']],
            ['Какой тег используется для ссылки?', ['<a>', '<link>', '<href>', '<url>']],
            ['Какой атрибут указывает адрес ссылки?', ['href', 'src', 'alt', 'class']],
            ['Какой тег используется для изображения?', ['<img>', '<image>', '<picture>', '<src>']],
            ['Какой атрибут указывает путь к изображению?', ['src', 'href', 'alt', 'id']],
            ['Какой тег создаёт список с маркерами?', ['<ul>', '<ol>', '<li>', '<list>']],
            ['Какой тег создаёт нумерованный список?', ['<ol>', '<ul>', '<li>', '<num>']],
            ['Какой тег используется для строки таблицы?', ['<tr>', '<td>', '<th>', '<table>']],
            ['Какой тег используется для ячейки таблицы?', ['<td>', '<tr>', '<table>', '<row>']],
            ['Какой тег используется для формы?', ['<form>', '<input>', '<button>', '<label>']],
            ['Какой тег используется для поля ввода?', ['<input>', '<field>', '<text>', '<form>']],
            ['Какой тип input используется для пароля?', ['password', 'text', 'email', 'hidden']],
            ['Какой тег используется для кнопки?', ['<button>', '<btn>', '<click>', '<submit>']],
            ['Какой тег подключает CSS-файл?', ['<link>', '<style>', '<script>', '<css>']],
            ['Где обычно находится тег <title>?', ['Внутри <head>', 'Внутри <body>', 'После </html>', 'Внутри <footer>']],
            ['Какой тег содержит видимую часть страницы?', ['<body>', '<head>', '<title>', '<meta>']],
            ['Какой тег задаёт метаданные страницы?', ['<meta>', '<data>', '<info>', '<head>']],
            ['Что означает HTML?', ['HyperText Markup Language', 'High Text Machine Language', 'Hyper Tool Markup Link', 'Home Text Main Language']]
        ]
    },
    {
        courseTitle: 'CSS',
        courseDescription: 'Оформление и стилизация веб-страниц',
        testTitle: 'Тест по CSS',
        questions: [
            ['Что такое CSS?', ['Язык стилей', 'Язык программирования', 'База данных', 'Сервер']],
            ['Какое свойство меняет цвет текста?', ['color', 'background', 'font-size', 'display']],
            ['Какое свойство меняет фон элемента?', ['background-color', 'color', 'border', 'margin']],
            ['Какое свойство меняет размер шрифта?', ['font-size', 'font-family', 'text-align', 'width']],
            ['Какое свойство выравнивает текст по центру?', ['text-align', 'align-items', 'justify-content', 'position']],
            ['Какое значение display делает элемент гибким контейнером?', ['flex', 'block', 'inline', 'grid-item']],
            ['Какое свойство задаёт внешний отступ?', ['margin', 'padding', 'border', 'gap']],
            ['Какое свойство задаёт внутренний отступ?', ['padding', 'margin', 'outline', 'top']],
            ['Какое свойство задаёт рамку?', ['border', 'box-shadow', 'outline-color', 'line']],
            ['Какое свойство скругляет углы?', ['border-radius', 'border-style', 'radius', 'corner']],
            ['Какое свойство задаёт ширину?', ['width', 'height', 'size', 'max']],
            ['Какое свойство задаёт высоту?', ['height', 'width', 'top', 'bottom']],
            ['Какой селектор выбирает элемент по id?', ['#id', '.id', 'id', '*id']],
            ['Какой селектор выбирает элемент по классу?', ['.class', '#class', 'class', '@class']],
            ['Какое свойство делает текст жирным?', ['font-weight', 'font-style', 'text-decoration', 'line-height']],
            ['Какое свойство добавляет тень блоку?', ['box-shadow', 'text-shadow', 'shadow-box', 'border-shadow']],
            ['Какое свойство управляет расположением элемента?', ['position', 'display-text', 'font', 'overflow-color']],
            ['Какое значение position фиксирует элемент на экране?', ['fixed', 'absolute', 'relative', 'static']],
            ['Какое свойство управляет расстоянием между flex-элементами?', ['gap', 'space', 'margin-auto', 'between']],
            ['Какое свойство скрывает лишнее содержимое?', ['overflow', 'display', 'visibility-color', 'hide']]
        ]
    },
    {
        courseTitle: 'JavaScript',
        courseDescription: 'Основы программирования на JavaScript',
        testTitle: 'Тест по JavaScript',
        questions: [
            ['Что такое JavaScript?', ['Язык программирования', 'Язык разметки', 'База данных', 'Операционная система']],
            ['Как объявить переменную, значение которой можно менять?', ['let', 'const', 'varname', 'change']],
            ['Как объявить константу?', ['const', 'let', 'static', 'fixed']],
            ['Какой оператор используется для строгого сравнения?', ['===', '==', '=', '!=']],
            ['Как вывести сообщение в консоль?', ['console.log()', 'print()', 'echo()', 'write()']],
            ['Какой тип данных хранит true или false?', ['boolean', 'string', 'number', 'object']],
            ['Какой метод преобразует JSON-строку в объект?', ['JSON.parse()', 'JSON.stringify()', 'JSON.object()', 'JSON.convert()']],
            ['Какой метод превращает объект в JSON-строку?', ['JSON.stringify()', 'JSON.parse()', 'JSON.toObject()', 'JSON.read()']],
            ['Как создать функцию?', ['function name() {}', 'func name {}', 'create function', 'def name():']],
            ['Какой метод добавляет элемент в конец массива?', ['push()', 'pop()', 'shift()', 'slice()']],
            ['Какой метод удаляет последний элемент массива?', ['pop()', 'push()', 'map()', 'join()']],
            ['Какой метод перебирает массив и возвращает новый массив?', ['map()', 'forEach()', 'pop()', 'reduceText()']],
            ['Какой метод используется для поиска элемента в массиве?', ['find()', 'searchAll()', 'get()', 'select()']],
            ['Что такое DOM?', ['Объектная модель документа', 'База данных сайта', 'Серверный модуль', 'Тип переменной']],
            ['Как получить элемент по id?', ['document.getElementById()', 'document.query()', 'get.id()', 'document.id()']],
            ['Какой обработчик используется при клике?', ['onclick', 'onhover', 'onchangeText', 'onloadClick']],
            ['Что делает fetch()?', ['Отправляет HTTP-запрос', 'Создаёт HTML-тег', 'Запускает базу данных', 'Меняет CSS']],
            ['Что такое async/await?', ['Способ работы с асинхронным кодом', 'Тип CSS', 'HTML-тег', 'Команда PostgreSQL']],
            ['Как обозначается комментарий в одну строку?', ['// комментарий', '<!-- комментарий -->', '# комментарий', '/* только так */']],
            ['Какой тип данных используется для текста?', ['string', 'number', 'boolean', 'array-only']]
        ]
    },
    {
        courseTitle: 'PostgreSQL',
        courseDescription: 'Работа с системой управления базами данных PostgreSQL',
        testTitle: 'Тест по PostgreSQL',
        questions: [
            ['Что такое PostgreSQL?', ['Система управления базами данных', 'Язык программирования', 'Браузер', 'Редактор кода']],
            ['Какая команда используется для выборки данных?', ['SELECT', 'GET', 'OPEN', 'READ']],
            ['Какая команда добавляет данные в таблицу?', ['INSERT', 'ADD', 'PUSH', 'CREATE DATA']],
            ['Какая команда обновляет данные?', ['UPDATE', 'CHANGE', 'EDIT', 'MODIFY ROW']],
            ['Какая команда удаляет данные?', ['DELETE', 'REMOVE', 'DROP ROW ONLY', 'CLEAR ONE']],
            ['Какой тип данных хранит целые числа?', ['INTEGER', 'TEXT', 'BOOLEAN', 'DATE']],
            ['Какой тип данных хранит текст?', ['VARCHAR', 'INT', 'BOOL', 'SERIAL ONLY']],
            ['Что такое PRIMARY KEY?', ['Уникальный идентификатор записи', 'Название базы', 'Пароль пользователя', 'Тип таблицы']],
            ['Что такое FOREIGN KEY?', ['Связь с другой таблицей', 'Главный пароль', 'Название сервера', 'Тип индекса']],
            ['Какая команда создаёт таблицу?', ['CREATE TABLE', 'NEW TABLE', 'MAKE TABLE', 'BUILD TABLE']],
            ['Какая команда удаляет таблицу?', ['DROP TABLE', 'DELETE TABLE DATA', 'REMOVE ALL', 'CLEAR TABLE']],
            ['Что делает WHERE?', ['Задаёт условие отбора', 'Создаёт таблицу', 'Удаляет базу', 'Меняет пароль']],
            ['Что делает ORDER BY?', ['Сортирует результат', 'Добавляет строку', 'Создаёт индекс', 'Меняет тип']],
            ['Что делает COUNT(*)?', ['Считает количество строк', 'Удаляет строки', 'Создаёт таблицу', 'Меняет имя']],
            ['Что делает JOIN?', ['Объединяет данные из таблиц', 'Удаляет таблицу', 'Создаёт пользователя', 'Очищает базу']],
            ['Какой тип хранит TRUE/FALSE?', ['BOOLEAN', 'VARCHAR', 'INTEGER', 'TIMESTAMP']],
            ['Что такое SERIAL?', ['Автоматически увеличиваемое число', 'Текстовый тип', 'Дата', 'Логический тип']],
            ['Что такое pgAdmin?', ['Инструмент для работы с PostgreSQL', 'Фреймворк Node.js', 'CSS-библиотека', 'Браузер']],
            ['Какая команда ограничивает количество строк?', ['LIMIT', 'STOP', 'MAXROWS', 'CUT']],
            ['Какой оператор проверяет равенство в SQL?', ['=', '==', '===', 'equals']]
        ]
    },
    {
        courseTitle: 'Node.js',
        courseDescription: 'Серверная разработка на Node.js',
        testTitle: 'Тест по Node.js',
        questions: [
            ['Что такое Node.js?', ['Среда выполнения JavaScript на сервере', 'База данных', 'HTML-редактор', 'CSS-фреймворк']],
            ['Какой файл часто является главным файлом сервера?', ['server.js', 'style.css', 'index.html', 'database.png']],
            ['Что такое npm?', ['Менеджер пакетов Node.js', 'База данных', 'HTML-тег', 'Команда CSS']],
            ['Какая команда создаёт package.json?', ['npm init -y', 'node create', 'npm start db', 'express init html']],
            ['Какая команда устанавливает Express?', ['npm install express', 'node install express', 'install node express', 'express download']],
            ['Что такое Express.js?', ['Фреймворк для Node.js', 'СУБД', 'Язык разметки', 'CSS-движок']],
            ['Как подключить модуль через CommonJS?', ['require()', 'importHTML()', 'connect()', 'module()']],
            ['Что делает app.get()?', ['Обрабатывает GET-запрос', 'Создаёт базу', 'Меняет CSS', 'Удаляет файл']],
            ['Что делает app.post()?', ['Обрабатывает POST-запрос', 'Открывает браузер', 'Создаёт HTML', 'Меняет шрифт']],
            ['Для чего нужен express.json()?', ['Для чтения JSON из запроса', 'Для создания таблиц', 'Для запуска CSS', 'Для загрузки картинок']],
            ['Что такое middleware?', ['Промежуточная функция обработки запроса', 'Тип базы данных', 'HTML-элемент', 'Пароль сервера']],
            ['Как запустить файл server.js?', ['node server.js', 'run server.html', 'start css', 'open db.js']],
            ['Что такое порт сервера?', ['Номер, по которому доступен сервер', 'Имя таблицы', 'Тип переменной', 'Название папки']],
            ['Какой порт часто используют для разработки?', ['3000', '25', '5432 только для сайта', '808080']],
            ['Что такое API?', ['Интерфейс для обмена данными между программами', 'Цвет сайта', 'Тип кнопки', 'Шрифт']],
            ['Что делает res.json()?', ['Отправляет JSON-ответ', 'Создаёт файл', 'Удаляет базу', 'Меняет HTML']],
            ['Что такое req.body?', ['Данные, пришедшие от клиента', 'Название сервера', 'CSS-стиль', 'Папка проекта']],
            ['Для чего нужен dotenv?', ['Для хранения настроек из .env', 'Для рисования графиков', 'Для создания HTML', 'Для подключения шрифтов']],
            ['Для чего нужен bcryptjs?', ['Для хеширования паролей', 'Для подключения CSS', 'Для создания таблиц', 'Для отправки email']],
            ['Что делает app.listen()?', ['Запускает сервер на порту', 'Удаляет сервер', 'Создаёт базу', 'Открывает pgAdmin']]
        ]
    },
    {
        courseTitle: 'SQL',
        courseDescription: 'Основы языка SQL',
        testTitle: 'Тест по SQL',
        questions: [
            ['Что такое SQL?', ['Язык запросов к базам данных', 'Язык разметки', 'Браузер', 'Редактор изображений']],
            ['Какая команда выбирает данные?', ['SELECT', 'PRINT', 'SHOWHTML', 'OPEN']],
            ['Какая команда указывает таблицу для выборки?', ['FROM', 'TABLE', 'INTO', 'WHERE']],
            ['Какая команда задаёт условие?', ['WHERE', 'IF', 'WHEN', 'FILTER ONLY']],
            ['Какая команда сортирует данные?', ['ORDER BY', 'SORT', 'GROUP SORT', 'LIST BY']],
            ['Как выбрать все столбцы?', ['SELECT *', 'SELECT ALL COLUMNS', 'GET *', 'OPEN ALL']],
            ['Как добавить новую строку?', ['INSERT INTO', 'ADD ROW', 'NEW DATA', 'PUT INTO']],
            ['Как обновить строку?', ['UPDATE', 'CHANGE ROW', 'EDIT SQL', 'SAVE ROW']],
            ['Как удалить строку?', ['DELETE', 'REMOVE', 'DROP ONE', 'CUT']],
            ['Как создать таблицу?', ['CREATE TABLE', 'MAKE TABLE', 'TABLE NEW', 'BUILD DATA']],
            ['Как удалить таблицу полностью?', ['DROP TABLE', 'DELETE ROWS', 'REMOVE DATA', 'CLEAR']],
            ['Что делает GROUP BY?', ['Группирует строки', 'Удаляет строки', 'Создаёт базу', 'Меняет пароль']],
            ['Что делает HAVING?', ['Фильтрует группы', 'Фильтрует CSS', 'Создаёт пользователя', 'Запускает сервер']],
            ['Что делает COUNT?', ['Считает строки', 'Создаёт строки', 'Удаляет строки', 'Меняет тип']],
            ['Что делает AVG?', ['Считает среднее значение', 'Считает сумму', 'Находит максимум', 'Удаляет пустые']],
            ['Что делает SUM?', ['Считает сумму', 'Считает среднее', 'Сортирует', 'Удаляет']],
            ['Что делает MAX?', ['Находит максимальное значение', 'Находит среднее', 'Считает строки', 'Объединяет таблицы']],
            ['Что делает MIN?', ['Находит минимальное значение', 'Находит сумму', 'Создаёт таблицу', 'Удаляет базу']],
            ['Что делает LIKE?', ['Ищет по шаблону', 'Объединяет таблицы', 'Удаляет строки', 'Создаёт индекс']],
            ['Что означает NULL?', ['Отсутствие значения', 'Ноль всегда', 'Пустая таблица', 'Ошибка сервера']]
        ]
    },
    {
        courseTitle: 'Python',
        courseDescription: 'Основы программирования на Python',
        testTitle: 'Тест по Python',
        questions: [
            ['Что такое Python?', ['Язык программирования', 'База данных', 'HTML-тег', 'CSS-свойство']],
            ['Как вывести текст в консоль?', ['print()', 'console.log()', 'echo()', 'writeLine()']],
            ['Как объявить переменную в Python?', ['name = "Ali"', 'let name = "Ali"', 'var name = "Ali"', 'string name = "Ali"']],
            ['Какой тип данных хранит целые числа?', ['int', 'str', 'bool', 'list']],
            ['Какой тип данных хранит текст?', ['str', 'int', 'float', 'dict']],
            ['Какой тип хранит true/false?', ['bool', 'str', 'array', 'number']],
            ['Как создать список?', ['[1, 2, 3]', '{1, 2, 3}', '(key: value)', '<list>']],
            ['Как создать словарь?', ['{"name": "Ali"}', '[name: Ali]', '(name = Ali)', '<dict>']],
            ['Как начать условие?', ['if', 'when', 'where', 'check']],
            ['Как обозначается блок кода в Python?', ['Отступами', 'Фигурными скобками', 'Круглыми скобками', 'Тегами']],
            ['Какой цикл перебирает элементы?', ['for', 'foreach only', 'loopin', 'repeat each']],
            ['Какой цикл работает пока условие истинно?', ['while', 'during', 'repeat', 'loopif']],
            ['Как создать функцию?', ['def my_function():', 'function myFunction() {}', 'func myFunction()', 'create function']],
            ['Как добавить элемент в список?', ['append()', 'push()', 'addEnd()', 'insertLast()']],
            ['Как получить длину списка?', ['len()', 'length()', 'size()', 'countLength()']],
            ['Какой оператор используется для равенства?', ['==', '=', '===', 'equals']],
            ['Какой оператор означает “не равно”?', ['!=', '<>', '!== only', 'not=']],
            ['Как импортировать модуль?', ['import', 'include', 'require', 'using']],
            ['Как написать комментарий в одну строку?', ['# комментарий', '// комментарий', '<!-- комментарий -->', '/* комментарий */']],
            ['Как обработать исключение?', ['try/except', 'try/catch', 'error/fix', 'catch only']]
        ]
    }
];

async function seedTests() {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        await client.query('TRUNCATE TABLE results, answers, questions, tests, lessons, courses RESTART IDENTITY CASCADE');

        for (const testItem of testsData) {
            const courseResult = await client.query(
                'INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING id',
                [testItem.courseTitle, testItem.courseDescription]
            );

            const courseId = courseResult.rows[0].id;

            await client.query(
                'INSERT INTO lessons (course_id, title, content) VALUES ($1, $2, $3)',
                [
                    courseId,
                    `Введение в ${testItem.courseTitle}`,
                    `Этот курс содержит основные материалы по теме ${testItem.courseTitle}. После изучения материала пользователь может пройти тестирование.`
                ]
            );

            const testResult = await client.query(
                'INSERT INTO tests (course_id, title) VALUES ($1, $2) RETURNING id',
                [courseId, testItem.testTitle]
            );

            const testId = testResult.rows[0].id;

            for (const questionItem of testItem.questions) {
                const questionText = questionItem[0];
                const options = questionItem[1];

                const questionResult = await client.query(
                    'INSERT INTO questions (test_id, question_text) VALUES ($1, $2) RETURNING id',
                    [testId, questionText]
                );

                const questionId = questionResult.rows[0].id;

                for (let i = 0; i < options.length; i++) {
                    await client.query(
                        'INSERT INTO answers (question_id, answer_text, is_correct) VALUES ($1, $2, $3)',
                        [questionId, options[i], i === 0]
                    );
                }
            }
        }

        await client.query('COMMIT');

        console.log('Готово! В базу добавлены 7 тестов по 20 вопросов.');
        console.log('HTML, CSS, JavaScript, PostgreSQL, Node.js, SQL, Python');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Ошибка при заполнении базы:', error);
    } finally {
        client.release();
        pool.end();
    }
}

seedTests();