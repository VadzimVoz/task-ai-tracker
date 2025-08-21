// components/TaskTabs.tsx
'use client';

import { useState } from 'react';
import TodayTasks from './TodayTasks';
import Reminders from './Reminders';
import SmartAIAssistant from './SmartAIAssistant';

export default function TaskTabs() {
  const [activeTab, setActiveTab] = useState<'today' | 'reminders'>('today');

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '20px',
        background: '#f5f5f5',
        padding: '8px',
        borderRadius: '12px'
      }}>
        <button
          onClick={() => setActiveTab('today')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'today' ? '#0070f3' : 'transparent',
            color: activeTab === 'today' ? 'white' : '#666',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          📝 На сегодня
        </button>
        <button
          onClick={() => setActiveTab('reminders')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'reminders' ? '#0070f3' : 'transparent',
            color: activeTab === 'reminders' ? 'white' : '#666',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          ⏰ Напоминания
        </button>
      </div>

      {/* Умный AI-помощник */}
      <SmartAIAssistant />

      {/* Контент табов */}
      {activeTab === 'today' ? <TodayTasks /> : <Reminders />}
    </div>
  );
}