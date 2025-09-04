'use client';

import { useState } from 'react';
import TodayTasks from './TodayTasks';
import Reminders from './Reminders';
import SmartAIAssistant from './SmartAIAssistant';

import '../styles/layout.css';
import '../styles/typography.css';
import '../styles/states.css';
import '../styles/tasks.css';
import '../styles/reminders.css';

type TabType = 'today' | 'reminders';

export default function TaskTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('today');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'today':
        return <TodayTasks />;
      case 'reminders':
        return <Reminders />;
      default:
        return null;
    }
  };

  return (
    <section className="task-tabs" data-testid="task-tabs">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'today' ? 'active' : ''}`}
          onClick={() => setActiveTab('today')}
          data-testid="tab-today"
        >
          📝 На сегодня
        </button>
        <button
          className={`tab-button ${activeTab === 'reminders' ? 'active' : ''}`}
          onClick={() => setActiveTab('reminders')}
          data-testid="tab-reminders"
        >
          ⏰ Напоминания
        </button>
      </div>

      <SmartAIAssistant />

      <div className="tab-content" data-testid="tab-content">
        {renderTabContent()}
      </div>
    </section>
  );
}
