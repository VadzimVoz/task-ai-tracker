'use client';

import { useEffect } from 'react';
import TaskForm from './TaskForm';
import { useTaskStore } from '../store/taskStore';

export default function TodayTasks() {
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

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (text: string) => {
    try {
      await addTask({
        text,
        type: 'today',
        completed: false,
        dueDate: null
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

  const todayTasks = tasks.filter(task => task.type === 'today');

  if (loading && tasks.length === 0) {
    return (
      <div>
        <h2>Задачи на сегодня</h2>
        <div>Загрузка задач...</div>
      </div>
    );
  }

  return (
    <div>
      <h2>Задачи на сегодня</h2>
      
      {error && (
        <div>
          <span>{error}</span>
          <button onClick={clearError} title="Закрыть">
            ×
          </button>
        </div>
      )}

      <TaskForm 
        onSubmit={handleAddTask} 
        placeholder="Добавить задачу..."
        disabled={loading}
      />
      
      <div>
        <h3>Мои задачи:</h3>
        
        {todayTasks.length === 0 ? (
          <div>
            <p>✅ Нет задач на сегодня</p>
            <p>Добавьте первую задачу выше</p>
          </div>
        ) : (
          <ul>
            {todayTasks.map(task => (
              <li key={task.id}>
                <div>
                  <div>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id, task.completed)}
                      disabled={loading}
                    />
                    <span className={task.completed ? 'completed' : ''}>
                      {task.text}
                    </span>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      disabled={loading}
                      title="Удалить задачу"
                    >
                      🗑️
                    </button>
                  </div>
                  
                  {task.createdAt && (
                    <div>
                      <span>
                        📅 {new Date(task.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}