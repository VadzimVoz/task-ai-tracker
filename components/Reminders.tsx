'use client';

import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTaskStore } from '../store/taskStore';
import '../styles/reminders.css';

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

  return (
    <div>
      <h2 className="reminder-title">Напоминания</h2>

      {loading && tasks.length === 0 && (
        <div className="reminder-description">Загрузка напоминаний...</div>
      )}

      {error && (
        <div className="reminder-description">
          <span>{error}</span>
          <button onClick={clearError} title="Закрыть">
            ×
          </button>
        </div>
      )}

      <div className="reminder-description">
        <label htmlFor="datepicker">Дата и время напоминания:</label>
        <DatePicker
          id="datepicker"
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

      <div className="reminder-description">
        <TaskForm
          onSubmit={handleAddReminder}
          placeholder="Текст напоминания..."
          disabled={loading}
        />
      </div>

      <div>
        <h3 className="reminder-title">Мои напоминания:</h3>

        {reminders.length === 0 ? (
          <div className="reminder-description">
            <p>⏰ Нет напоминаний</p>
            <p>Добавьте первое напоминание выше</p>
          </div>
        ) : (
          <ul className="reminder-list">
            {reminders.map(reminder => (
              <li key={reminder.id} className="reminder-item">
                <div className="reminder-meta">
                  <div className="reminder-content">
                    <input
                      type="checkbox"
                      checked={reminder.completed}
                      onChange={() => handleToggleReminder(reminder.id, reminder.completed)}
                      disabled={loading}
                    />
                    <span className={`reminder-description ${reminder.completed ? 'completed' : ''}`}>
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
                </div>

                <div className="reminder-meta">
                  <span className="reminder-date">
                    📅 {reminder.dueDate
                      ? new Date(reminder.dueDate).toLocaleDateString('ru-RU')
                      : 'Нет даты'}
                  </span>
                  <span className="reminder-date">
                    ⏰ {reminder.dueDate
                      ? new Date(reminder.dueDate).toLocaleTimeString('ru-RU', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : 'Нет времени'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
