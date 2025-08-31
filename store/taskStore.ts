import { create } from 'zustand';
import { Task } from '../types/task';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../lib/api/tasks';

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

  fetchTasks: async () => {
    try {
      set({ loading: true, error: null });
      const data = await fetchTasks();
      set({ tasks: data, loading: false });
    } catch (error: any) {
      set({ error: error.message || 'Ошибка загрузки', loading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      set({ loading: true, error: null });
      const newTask = await createTask(taskData);
      set((state) => ({ tasks: [...state.tasks, newTask], loading: false }));
    } catch (error: any) {
      set({ error: error.message || 'Ошибка добавления', loading: false });
      throw error;
    }
  },

  updateTask: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      const updated = await updateTask(id, updates);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message || 'Ошибка обновления', loading: false });
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      set({ loading: true, error: null });
      await deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message || 'Ошибка удаления', loading: false });
      throw error;
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
