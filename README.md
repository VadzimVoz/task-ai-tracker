# 🧠 AI Task Tracker — Умный трекер задач

**Next.js 14 · TypeScript · React · Zustand · Prisma · Zod**

Интерактивный трекер задач и напоминаний с встроенным псевдо-AI помощником. Разработан на современном стеке без внешних API — всё локально, быстро и безопасно.

---

## 🔥 Последние обновления

- ✅ Подключена полноценная база данных: **PostgreSQL + Prisma**
- ✅ API разделён на REST-эндпоинты по задачам
- ✅ Стили вынесены в CSS-модули, устранено дублирование
- ✅ Добавлена строгая валидация через **Zod**
- ✅ Улучшена типизация, структура компонентов и архитектура

---

## ✨ Особенности

- 📋 Управление задачами — создание, редактирование, удаление
- ⏰ Умные напоминания — с выбором даты и времени
- 🤖 AI-помощник — генерация предложений на основе контекста
- 📊 Анализ продуктивности — статистика выполнения
- 📱 Адаптивный дизайн — работает на всех устройствах
- ⚡ Высокая производительность — благодаря Next.js 14 и App Router

---

## 🧰 Технологический стек

| Категория            | Технология                          |
|----------------------|-------------------------------------|
| Фреймворк            | Next.js 14 (App Router)             |
| Язык                 | TypeScript                          |
| Стейт-менеджмент     | Zustand                             |
| ORM и база данных    | Prisma + PostgreSQL                 |
| Валидация            | Zod                                 |
| Стили                | CSS Modules + Tailwind              |
| Дата/время           | React Datepicker                    |
| Тестирование         | Jest + Testing Library              |
| AI-движок            | Кастомный псевдо-AI (без API)       |

---

## 🚀 Быстрый старт

### 🔧 Предварительные требования

- Node.js **18+**
- npm или yarn
- PostgreSQL (или SQLite для локального теста)

---

### 📦 Установка


git clone https://github.com/VadzimVoz/task-ai-tracker.git
cd task-ai-tracker
npm install

# 🔐 Настройка Prisma

Установи Prisma CLI:



npm install prisma @prisma/client
Создай файл .env в корне проекта:

env
DATABASE_URL="postgresql://postgres:password@localhost:5432/task_db"
LOG_LEVEL="query"
Сгенерируй клиент и примени миграции:

bash
npx prisma generate
npx prisma migrate dev --name init
▶️ Запуск проекта
bash
npm run dev
Открой в браузере: http://localhost:3000

📜 Скрипты
Команда	Назначение
npm run dev	Запуск сервера разработки
npm run build	Сборка production-версии
npm run start	Запуск production-сервера
npm run lint	Проверка кода через ESLint
npm test	Запуск тестов
📁 Архитектура проекта
Code
task-ai-tracker/
├── app/                  # App Router
│   ├── api/              # API endpoints
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Главная страница
├── components/           # UI-компоненты
│   ├── TaskTabs.tsx
│   ├── SmartAIAssistant.tsx
│   ├── TaskForm.tsx
│   ├── TaskList.tsx
│   ├── TaskItem.tsx
│   ├── Reminders.tsx
│   └── DebugInfo.tsx
├── lib/                  # Вспомогательные библиотеки
│   ├── pseudoAI.ts
│   ├── api.ts
│   └── cors.ts
├── store/                # Zustand хранилище
│   └── taskStore.ts
├── types/                # Типы данных
│   └── task.ts
├── prisma/               # Prisma ORM
│   ├── schema.prisma
│   └── migrations/
└── styles/               # Стили
    ├── tasks.css
    ├── states.css
    ├── global.css
    └── layout.css
📦 Зависимости
Основные
bash
npm install next react react-dom
npm install @prisma/client
npm install zod
npm install zustand
npm install react-datepicker
Для разработки
bash
npm install -D prisma
npm install -D typescript
npm install -D eslint prettier
npm install -D @types/node @types/react
npm install -D tailwindcss postcss autoprefixer
npm install -D jest ts-jest @types/jest
npm install -D babel-jest
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
🧩 Ключевые компоненты
🤖 Smart AI Assistant
Анализирует время суток

Учитывает контекст задач

Предлагает действия на основе паттернов

📋 Task Management
Полноценный CRUD

Локальное хранение

Поддержка напоминаний

⚡ Performance
Быстрая загрузка с Next.js 14

Эффективное состояние через Zustand

Без внешних API — всё локально

🎨 Интерфейс
Чистый, современный UI

Адаптивная верстка

Плавные анимации

📈 Планы по развитию
🔌 Оффлайн-режим

📤 Экспорт задач в PDF/CSV

📅 Интеграция с календарями

🧠 Подключение настоящего AI (в будущем)

🤝 Как помочь проекту
bash
# Форкни репозиторий
git checkout -b feature/amazing-feature
git commit -m 'Add amazing feature'
git push origin feature/amazing-feature
Открой Pull Request — и твой вклад будет учтён!

📄 Лицензия
Проект лицензирован под MIT License

👨‍💻 Автор
Вадим Вазняк 📧 vadimvoznyak5965@gmail.com 🔗 GitHub: @VadzimVoz

🙏 Благодарности
Команда Next.js — за мощный фреймворк

Сообщество React — за вдохновение

AI-ассистент — за помощь в архитектуре и разработке
