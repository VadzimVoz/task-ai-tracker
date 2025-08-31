import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
  text: z.string().min(1).optional(),
  type: z.enum(['today', 'reminder']).optional(),
  completed: z.boolean().optional(),
  dueDate: z.string().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Неверный формат ID' });
  }

  try {
    if (req.method === 'PUT') {
      const parsed = updateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: 'Неверные данные', issues: parsed.error.issues });
      }

      const updated = await prisma.task.update({
        where: { id },
        data: parsed.data,
      });

      return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
      await prisma.task.delete({ where: { id } });
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Метод не поддерживается' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Неизвестная ошибка' });
  }
}
