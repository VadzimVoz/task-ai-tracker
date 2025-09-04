import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  type: z.enum(['today', 'reminder']),
  completed: z.boolean(),
  dueDate: z.string().nullable().optional(),
  createdAt: z.string(),
});
export const createTaskSchema = z.object({
  text: z.string().min(1, 'Текст задачи обязателен'),
  type: z.enum(['today', 'reminder']), // убраны "upcoming", "someday"
  completed: z.boolean().optional(),
  dueDate: z.union([z.string().datetime(), z.null()]).optional(),
});


export const updateTaskSchema = taskSchema.partial().omit({ id: true, createdAt: true });

