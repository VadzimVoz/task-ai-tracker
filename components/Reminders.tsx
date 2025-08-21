'use client';

import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTaskStore } from '../store/taskStore';

export default function Reminders() {
  const { 
    tasks, 
    loading, 
    error, 
    fetchTasks, 
    addTask, 
    updateTask, 
    deleteTask, 
    clearError 
  } = useTaskStore();
  
  const [dueDate, setDueDate] = useState<Date | null>(new Date());

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddReminder = async (text: string) => {
    if (!dueDate) {
      clearError();
      return;
    }
    
    try {
      await addTask({
        text,
        type: 'reminder',
        completed: false,
        dueDate: dueDate.toISOString()
      });
      setDueDate(new Date());
    } catch (error) {
      // Ошибка уже обработана в хранилище
    }
  };

  const handleToggleReminder = async (id: string, completed: boolean) => {
    try {
      await updateTask(id, { completed: !completed });
    } catch (error) {
      // Ошибка уже обработана в хранилище
    }
  };

  const handleDeleteReminder = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (error) {
      // Ошибка уже обработана в хранилище
    }
  };

  const reminders = tasks.filter(task => task.type === 'reminder');

  if (loading && tasks.length === 0) {
    return (
      <div>
        <h2>Напоминания</h2>
        <div>Загрузка напоминаний...</div>
      </div>
    );
  }

  return (
    <div>
      <h2>Напоминания</h2>
      
      {error && (
        <div>
          <span>{error}</span>
          <button onClick={clearError} title="Закрыть">
            ×
          </button>
        </div>
      )}
      
      <div>
        <label>Дата и время напоминания:</label>
        <DatePicker
          selected={dueDate}
          onChange={setDueDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd.MM.yyyy HH:mm"
          minDate={new Date()}
          placeholderText="Выберите дату и время"
        />
      </div>

      <TaskForm 
        onSubmit={handleAddReminder} 
        placeholder="Текст напоминания..."
        disabled={loading}
      />
      
      <div>
        <h3>Мои напоминания:</h3>
        
        {reminders.length === 0 ? (
          <div>
            <p>⏰ Нет напоминаний</p>
            <p>Добавьте первое напоминание выше</p>
          </div>
        ) : (
          <ul>
            {reminders.map(reminder => (
              <li key={reminder.id}>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      checked={reminder.completed}
                      onChange={() => handleToggleReminder(reminder.id, reminder.completed)}
                      disabled={loading}
                    />
                    <span className={reminder.completed ? 'completed' : ''}>
                      {reminder.text}
                    </span>
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      disabled={loading}
                      title="Удалить напоминание"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  <div>
                    <span>
                      📅 {reminder.dueDate ? new Date(reminder.dueDate).toLocaleDateString('ru-RU') : 'Нет даты'}
                    </span>
                    <span>
                      ⏰ {reminder.dueDate ? new Date(reminder.dueDate).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : 'Нет времени'}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}