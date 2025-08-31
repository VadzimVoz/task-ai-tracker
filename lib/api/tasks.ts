// lib/api/tasks.ts

import { Task } from '@/types/task';

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch('/api/tasks');
  if (!res.ok) throw new Error('Ошибка загрузки задач');
  return res.json();
}

export async function createTask(taskData: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) throw new Error('Ошибка создания задачи');
  return res.json();
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Ошибка обновления задачи');
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Ошибка удаления задачи');
}
