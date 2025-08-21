// lib/pseudoAI.ts

interface AIKnowledgeBase {
  timeBased: {
    morning: string[];
    afternoon: string[];
    evening: string[];
    night: string[];
  };
  contextBased: {
    work: string[];
    personal: string[];
    health: string[];
    learning: string[];
  };
}

interface Pattern {
  pattern: RegExp;
  context: string;
}

export class PseudoAIService {
  // Явно типизируем статические свойства
  private static knowledgeBase: AIKnowledgeBase = {
    timeBased: {
      morning: [
        'Составить план на день',
        'Утренняя зарядка и медитация',
        'Проверить почту и календарь',
        'Приоритизация задач на день',
        'Кофе-брейк и чтение новостей'
      ],
      afternoon: [
        'Обеденный перерыв',
        'Работа над сложными задачами',
        'Встречи и коллаборации',
        'Проверка прогресса по задачам',
        'Короткий перерыв для перезагрузки'
      ],
      evening: [
        'Подведение итогов дня',
        'Планирование на завтра',
        'Завершение неоконченных задач',
        'Очистка рабочего пространства',
        'Время для самообразования'
      ],
      night: [
        'Подготовка к следующему дню',
        'Релаксация и отдых',
        'Чтение книги',
        'Планирование личных дел',
        'Подготовка одежды на завтра'
      ]
    },

    contextBased: {
      work: [
        'Подготовить отчет по проекту',
        'Созвать митинг с командой',
        'Обновить документацию',
        'Протестировать новые фичи',
        'Код-ревью задач'
      ],
      personal: [
        'Оплатить счета и коммуналку',
        'Записаться к врачу',
        'Купить продукты',
        'Уборка в квартире',
        'Забрать вечи из химчистки'
      ],
      health: [
        'Записаться на тренировку',
        'Приготовить здоровый обед',
        'Измерить давление',
        'Прогулка на свежем воздухе',
        'Принять витамины'
      ],
      learning: [
        'Пройди урок по Next.js',
        'Почитать документацию',
        'Посмотреть tech-туториал',
        'Попрактиковаться в кодинге',
        'Написать тестовый проект'
      ]
    }
  };

  // Явно типизируем smartPatterns
  private static smartPatterns: Pattern[] = [
    { pattern: /встреч|митинг|совещан/, context: 'work' },
    { pattern: /отчет|документ|презентац/, context: 'work' },
    { pattern: /покуп|купи|заказ/, context: 'personal' },
    { pattern: /уборк|чистк|помой/, context: 'personal' },
    { pattern: /спорт|трениров|зарядк/, context: 'health' },
    { pattern: /зуб|врач|больниц/, context: 'health' },
    { pattern: /учеба|изуч|обучен/, context: 'learning' },
    { pattern: /код|програм|разработ/, context: 'learning' }
  ];

  // Интерфейс для возвращаемых предложений
  static async generateSmartSuggestions(
    existingTasks: string[] = [],
    timeOfDay?: string,
    count: number = 3
  ): Promise<{ text: string; confidence: number; context: string }[]> {
    // Имитация задержки нейросети
    await this.simulateThinking();

    const time = timeOfDay || this.getTimeOfDay();
    const context = this.analyzeContext(existingTasks);
    
    const suggestions: { text: string; confidence: number; context: string }[] = [];

    // Генерация на основе времени
    const timeSuggestions = this.knowledgeBase.timeBased[time as keyof typeof this.knowledgeBase.timeBased] || [];
    timeSuggestions.forEach(suggestion => {
      suggestions.push({
        text: suggestion,
        confidence: 0.8,
        context: 'time'
      });
    });

    // Генерация на основе контекста
    if (context) {
      const contextSuggestions = this.knowledgeBase.contextBased[context as keyof typeof this.knowledgeBase.contextBased] || [];
      contextSuggestions.forEach(suggestion => {
        suggestions.push({
          text: suggestion,
          confidence: 0.9,
          context
        });
      });
    }

    // Уникальные предложения без дубликатов
    const uniqueSuggestions = suggestions
      .filter((suggestion, index, self) =>
        index === self.findIndex(s => s.text === suggestion.text)
      )
      .filter(suggestion => 
        !existingTasks.some(task => 
          task.toLowerCase().includes(suggestion.text.toLowerCase().substring(0, 10))
        )
      );

    // Ранжирование по уверенности и случайность
    return uniqueSuggestions
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, count)
      .map(suggestion => ({
        ...suggestion,
        text: this.addPersonalTouch(suggestion.text)
      }));
  }

  // Анализ контекста существующих задач
  private static analyzeContext(tasks: string[]): string | null {
    const allText = tasks.join(' ').toLowerCase();
    
    for (const { pattern, context } of this.smartPatterns) {
      if (pattern.test(allText)) {
        return context;
      }
    }

    return null;
  }

  // Определение времени суток
  private static getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night';
  }

  // Добавление персонализированных деталей
  private static addPersonalTouch(text: string): string {
    const touches = [
      'Не забудь: ',
      'Важно: ',
      'Рекомендую: ',
      'Совет: ',
      '💡 ',
      '🚀 ',
      '⭐ '
    ];

    const randomTouch = touches[Math.floor(Math.random() * touches.length)];
    return Math.random() > 0.7 ? randomTouch + text : text;
  }

  // Имитация "думания" AI
  private static simulateThinking(): Promise<void> {
    const delay = 800 + Math.random() * 1200; // 0.8-2 секунды
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  // Генерация умных напоминаний с датами
  static async generateSmartReminders(): Promise<string[]> {
    await this.simulateThinking();
    
    const days = ['понедельник', 'вторник', 'среду', 'четверг', 'пятницу', 'субботу', 'воскресенье'];
    const times = ['10:00', '14:30', '16:00', '18:45', '20:00'];
    
    const templates = [
      `Позвонить клиенту в {time}`,
      `Отправить отчет до {day}`,
      `Встреча с командой в {time}`,
      `Оплатить счета до {day}`,
      `Забрать документы в {time}`,
      `Подготовить презентацию на {day}`
    ];

    const reminders: string[] = [];
    for (let i = 0; i < 3; i++) {
      let reminder = templates[Math.floor(Math.random() * templates.length)];
      
      if (reminder.includes('{time}')) {
        reminder = reminder.replace('{time}', times[Math.floor(Math.random() * times.length)]);
      }
      
      if (reminder.includes('{day}')) {
        const dayOffset = Math.floor(Math.random() * 7) + 1;
        const date = new Date();
        date.setDate(date.getDate() + dayOffset);
        const dayName = days[date.getDay()];
        reminder = reminder.replace('{day}', dayName);
      }
      
      reminders.push(reminder);
    }

    return reminders;
  }
}