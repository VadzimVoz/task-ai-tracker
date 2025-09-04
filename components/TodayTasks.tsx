'use client';

import { useEffect } from 'react';
import TaskForm from './TaskForm';
import { useTaskStore } from '../store/taskStore';
import '../styles/tasks.css';
import '../styles/states.css';

export default function TodayTasks() {
  const {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    clearError,
  } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (text: string) => {
    try {
      await addTask({
        text,
        type: 'today',
        completed: false,
        dueDate: null,
      });
    } catch (error) {
      // Ошибка уже обработана в хранилище
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      await updateTask(id, { completed: !completed });
    } catch (error) {
      // Ошибка уже обработана в хранилище
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (error) {
      // Ошибка уже обработана в хранилище
    }
  };

  const todayTasks = tasks.filter((task) => task.type === 'today');

  return (
    <section>
      <h2 className="section-title">Задачи на сегодня</h2>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={clearError} title="Закрыть" className="error-close">
            ×
          </button>
        </div>
      )}

      <TaskForm
        onSubmit={handleAddTask}
        placeholder="Добавить задачу..."
        disabled={loading}
      />

      {loading && tasks.length === 0 ? (
        <div className="task-empty">Загрузка задач...</div>
      ) : todayTasks.length === 0 ? (
        <div className="task-empty">
          <p>✅ Нет задач на сегодня</p>
          <p>Добавьте первую задачу выше</p>
        </div>
      ) : (
        <ul className="task-list">
          {todayTasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id, task.completed)}
                  disabled={loading}
                />
                <span
                  className={`task-text ${task.completed ? 'completed' : ''}`}
                >
                  {task.text}
                </span>
              </div>

              <div className="task-date">
                📅 {new Date(task.createdAt).toLocaleDateString('ru-RU')}
              </div>

              <button
                onClick={() => handleDeleteTask(task.id)}
                disabled={loading}
                title="Удалить задачу"
                className="task-delete"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
