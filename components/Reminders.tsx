'use client';

import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTaskStore } from '../store/taskStore';
import '../styles/reminders.css';
import '../styles/datepicker.css';
import '../styles/states.css';

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
    } catch {}
  };

  const handleToggleReminder = async (id: string, completed: boolean) => {
    try {
      await updateTask(id, { completed: !completed });
    } catch {}
  };

  const handleDeleteReminder = async (id: string) => {
    try {
      await deleteTask(id);
    } catch {}
  };

  const reminders = tasks.filter(task => task.type === 'reminder');

  return (
    <div className="reminders-wrapper space-y-6">
      <h2 className="reminders-title text-xl font-semibold">Напоминания</h2>

      {error && (
        <div className="reminders-error state-error flex justify-between items-center">
          <span>{error}</span>
          <button onClick={clearError} title="Закрыть">×</button>
        </div>
      )}

      <div className="reminders-datepicker space-y-2">
        <label htmlFor="reminder-date" className="block text-sm font-medium text-gray-700">
          Дата и время напоминания:
        </label>
        <DatePicker
          id="reminder-date"
          selected={dueDate}
          onChange={setDueDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="dd.MM.yyyy HH:mm"
          minDate={new Date()}
          placeholderText="Выберите дату и время"
          className="datepicker-input"
        />
      </div>

      <TaskForm
        onSubmit={handleAddReminder}
        placeholder="Текст напоминания..."
        disabled={loading}
      />

      <div className="reminders-list space-y-4">
        <h3 className="text-lg font-medium">Мои напоминания:</h3>

        {reminders.length === 0 ? (
          <div className="reminders-empty state-empty">
            <p>⏰ Нет напоминаний</p>
            <p>Добавьте первое напоминание выше</p>
          </div>
        ) : (
          <ul className="reminders-ul space-y-3">
            {reminders.map(reminder => (
              <li key={reminder.id} className={`reminder-item ${reminder.completed ? 'completed' : ''}`}>
                <div className="reminder-main space-y-2">
                  <div className="reminder-top flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={reminder.completed}
                      onChange={() => handleToggleReminder(reminder.id, reminder.completed)}
                      disabled={loading}
                      className="reminder-checkbox w-5 h-5"
                    />
                    <span className={`reminder-text ${reminder.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                      {reminder.text}
                    </span>
                    <button
                      onClick={() => handleDeleteReminder(reminder.id)}
                      disabled={loading}
                      title="Удалить напоминание"
                      className="reminder-delete text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="reminder-meta flex gap-4 text-sm text-gray-500">
                    <span className="reminder-date">
                      📅 {reminder.dueDate ? new Date(reminder.dueDate).toLocaleDateString('ru-RU') : 'Нет даты'}
                    </span>
                    <span className="reminder-time">
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
