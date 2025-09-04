import { z } from 'zod';
import { taskSchema } from '@/schemas/task';
import { createTaskSchema } from '@/schemas/task';
import { updateTaskSchema } from '@/schemas/task';

export type Task = z.infer<typeof taskSchema>;
export type CreateTaskDto = z.infer<typeof createTaskSchema>;
export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
