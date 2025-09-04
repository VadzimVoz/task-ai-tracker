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

---
### Настройка Prisma
##Установи Prisma CLI:

npm install prisma @prisma/client


##Создай файл .env в корне проекта:

DATABASE_URL="postgresql://postgres:password@localhost:5432/db_name"
LOG_LEVEL="query"


##Сгенерируй клиент:

npx prisma generate

---
### Зависимости
- npm install next react react-dom
- npm install @prisma/client
- npm install zod
- npm install zustand
- npm install react-datepicker
- npm install -D tailwindcss postcss autoprefixer
- npm install -D jest ts-jest @types/jest
- npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
---
### Запуск проекта
npm run dev

Открой в браузере: http://localhost:3000

---
### 📜 Скрипты
- npm run dev - Запуск сервера разработки
- npm test - Запуск тестов
---
### 🧩 Ключевые компоненты
##🤖 Smart AI Assistant

Анализирует время суток

Учитывает контекст задач

Предлагает действия на основе паттернов

##📋 Task Management

Полноценный CRUD

Локальное хранение

Поддержка напоминаний

##⚡ Performance

Быстрая загрузка с Next.js 14

Эффективное состояние через Zustand

Без внешних API — всё локально

##🎨 Интерфейс

Чистый, современный UI

Адаптивная верстка

Плавные анимации

---
### 📄 Лицензия

Проект лицензирован под MIT License

--- 
### 👨‍💻 Автор

Вадим Вазняк
📧 vadimvoznyak5965@gmail.com

🔗 GitHub: @VadzimVoz
