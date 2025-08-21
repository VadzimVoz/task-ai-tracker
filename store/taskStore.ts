import { create } from 'zustand';
import { Task } from '../types/task';
import { apiRequest } from '../lib/api';

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (taskData: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,
  
  // Загрузка всех задач
  fetchTasks: async () => {
    try {
      set({ loading: true, error: null });
      const data = await apiRequest<Task[]>('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ action: 'get' })
      });
      set({ tasks: data, loading: false });
    } catch (error: any) {
      set({ 
        error: error.message || 'Не удалось загрузить задачи',
        loading: false 
      });
    }
  },
  
  // Добавление задачи
  addTask: async (taskData) => {
    try {
      set({ loading: true, error: null });
      const newTask = await apiRequest<Task>('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ 
          action: 'create',
          ...taskData
        })
      });
      set((state) => ({ 
        tasks: [...state.tasks, newTask],
        loading: false 
      }));
    } catch (error: any) {
      set({ 
        error: error.message || 'Не удалось добавить задачу',
        loading: false 
      });
      throw error;
    }
  },
  
  // Обновление задачи
  updateTask: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      const updatedTask = await apiRequest<Task>('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ 
          action: 'update',
          id,
          data: updates
        })
      });
      set((state) => ({
        tasks: state.tasks.map(task =>
          task.id === id ? updatedTask : task
        ),
        loading: false
      }));
    } catch (error: any) {
      set({ 
        error: error.message || 'Не удалось обновить задачу',
        loading: false 
      });
      throw error;
    }
  },
  
  // Удаление задачи
  deleteTask: async (id) => {
    try {
      set({ loading: true, error: null });
      await apiRequest('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({ 
          action: 'delete',
          id
        })
      });
      set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id),
        loading: false
      }));
    } catch (error: any) {
      set({ 
        error: error.message || 'Не удалось удалить задачу',
        loading: false 
      });
      throw error;
    }
  },
  
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));