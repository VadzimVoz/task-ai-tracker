'use client';

import { useTaskStore } from '../store/taskStore';

export default function DebugInfo() {
  const { tasks, loading, error } = useTaskStore();
  
  const todayTasks = tasks.filter(t => t.type === 'today');
  const reminders = tasks.filter(t => t.type === 'reminder');
  
  return (
    <div style={{ 
      marginTop: '20px', 
      padding: '10px', 
      background: '#f0f0f0', 
      borderRadius: '5px',
      fontSize: '12px'
    }}>
      <h4>Отладочная информация (Zustand Store):</h4>
      <p>🔄 Загрузка: {loading ? 'Да' : 'Нет'}</p>
      <p>❌ Ошибка: {error || 'Нет'}</p>
      <p>📊 Всего задач в хранилище: {tasks.length}</p>
      <p>✅ Задачи сегодня: {todayTasks.length}</p>
      <p>⏰ Напоминания: {reminders.length}</p>
      <p>✔️ Выполнено: {tasks.filter(t => t.completed).length}</p>
      <p>⏳ Не выполнено: {tasks.filter(t => !t.completed).length}</p>
      
      <div style={{ marginTop: '10px' }}>
        <strong>Последние задачи:</strong>
        {tasks.slice(-3).map(task => (
          <div key={task.id} style={{ 
            margin: '5px 0', 
            padding: '5px', 
            background: 'white',
            borderLeft: `4px solid ${task.type === 'today' ? '#4CAF50' : '#FF9800'}`
          }}>
            <div>{task.text}</div>
            <div style={{ fontSize: '10px', color: '#666' }}>
              {task.type} • {task.completed ? '✅' : '❌'} • 
              {new Date(task.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}