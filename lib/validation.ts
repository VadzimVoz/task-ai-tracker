import { z } from 'zod';

export const taskSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  type: z.enum(['today', 'reminder']),
  completed: z.boolean(),
  dueDate: z.string().optional().nullable(), // ISO-строка
});
export const updateTaskSchema = z.object({
  text: z.string().min(1).optional().default(undefined),
  completed: z.boolean().optional().default(undefined),
  dueDate: z.string().optional().default(undefined), // ✅ исправлено
});

export type Task = z.infer<typeof taskSchema>;