# 🚀 AI Task Tracker - Умный трекер задач

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Zustand](https://img.shields.io/badge/Zustand-4.4-purple?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

</div>

Умный трекер задач и напоминаний с псевдо-AI помощником. Разработан на современном стеке технологий без внешних зависимостей.

## ✨ Особенности

-  **Управление задачами** - Создание, редактирование, удаление задач
-  **Умные напоминания** - С датами и временем
-  **AI-помощник** - Генерация предложений на основе контекста
-  **Анализ продуктивности** - Статистика выполнения задач
-  **Адаптивный дизайн** - Работает на всех устройствах
- **Высокая производительность** - Next.js 14 и App Router

## Технологический стек

- **Фреймворк**: Next.js 14 с App Router
- **Язык**: TypeScript
- **Стейт-менеджмент**: Zustand
- **Стили**: CSS Modules
- **Дата/время**: React Datepicker
- **AI-движок**: Кастомный псевдо-AI (без внешних API)

##  Быстрый старт

### Предварительные требования

- Node.js 18+ 
- npm или yarn

### Установка

1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/VadzimVoz/task-ai-tracker.git
   cd task-ai-tracker
Установите зависимости

bash
npm install
Запустите сервер разработки

bash
npm run dev
Откройте в браузере

text
http://localhost:3000

Скрипты
npm run dev - Запуск development сервера

npm run build - Сборка production версии

npm run start - Запуск production сервера

npm run lint - Проверка кода ESLint

Архитектура проекта
text
task-ai-tracker/
├── app/                 # Next.js App Router
│   ├── api/            # API endpoints
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Главная страница
├── components/         # React компоненты
│   ├── TaskTabs.tsx    # Переключение между задачами и напоминаниями
│   ├── SmartAIAssistant.tsx # AI-помощник
│   └── DebugInfo.tsx   # Отладочная информация
├── lib/               # Вспомогательные библиотеки
│   ├── pseudoAI.ts    # Псевдо-AI движок
│   └── api.ts         # API клиент
├── store/             # Zustand хранилища
│   └── taskStore.ts   # Глобальное состояние задач
└── types/             # TypeScript типы
    └── task.ts        # Интерфейсы задач



Ключевые компоненты
Smart AI Assistant
Псевдо-AI система, которая анализирует:

Время суток для релевантных предложений

Контекст существующих задач

Паттерны поведения пользователя

Task Management
Полнофункциональный CRUD для задач:

Создание задач и напоминаний

Отметка выполнения

Удаление и редактирование

Локальное хранение данных

Performance
Оптимизированная загрузка с Next.js 14

Эффективное состояние с Zustand

Быстрые ответы без внешних API

 Интерфейс
Чистый современный дизайн

Интуитивная навигация

Адаптивная верстка

Плавные анимации
Планы по развити

Оффлайн-режим

Экспорт задач в PDF/CSV

Интеграция с календарями

Real AI интеграция (когда будет доступно)

Как помочь проекту
Форкните репозиторий

Создайте feature branch: git checkout -b feature/amazing-feature

Закоммитьте изменения: git commit -m 'Add amazing feature'

Запушите ветку: git push origin feature/amazing-feature

Откройте Pull Request

📄 Лицензия
Этот проект лицензирован под MIT License - смотрите файл LICENSE для деталей.

👨‍💻 Автор
Vadzim Vazniak

Email: vadimvoznyak5965@gmail.com

GitHub: @VadzimVoz



🙏 Благодарности
Команда Next.js за отличный фреймворк

Сообщество React за вдохновение

AI-ассистент за помощь в разработке

