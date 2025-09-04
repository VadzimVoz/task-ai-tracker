import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { updateTaskSchema } from '../../../../schemas/task';
import { withCORS, corsOptionsResponse } from '../../../../lib/cors';
import { z } from 'zod';

const paramsSchema = z.object({ id: z.string().cuid() });

export async function PUT(req: Request, context: { params: Record<string, string> }) {
  const { id } = context.params;
  const parsedParams = paramsSchema.safeParse({ id });

  if (!parsedParams.success) {
    console.error('❌ Неверный формат ID:', parsedParams.error.format());
    return NextResponse.json({ error: 'Неверный ID' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const parsedBody = updateTaskSchema.safeParse(body);

    if (!parsedBody.success) {
      console.error('❌ Ошибка валидации PUT:', parsedBody.error.format());
      return NextResponse.json({ error: 'Неверные данные' }, { status: 400 });
    }

    const { dueDate, ...rest } = parsedBody.data;

    const cleanData = Object.fromEntries(
      Object.entries(rest).filter(([_, v]) => v !== undefined)
    );

    const updated = await prisma.task.update({
      where: { id: parsedParams.data.id },
      data: {
        ...cleanData,
        ...(typeof dueDate === 'string' ? { dueDate: new Date(dueDate) } : {}),
      },
    });

    console.log('✅ Задача обновлена:', updated);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('❌ Ошибка в PUT /api/tasks/[id]:', error);
    return NextResponse.json({ error: 'Не удалось обновить задачу' }, { status: 500 });
  }
}
export async function DELETE(req: Request, context: { params: Record<string, string> }) {
  const { id } = context.params;
  const parsedParams = paramsSchema.safeParse({ id });

  if (!parsedParams.success) {
    console.error('Неверный формат ID:', parsedParams.error.format());
    return withCORS(NextResponse.json({ error: 'Неверный ID' }, { status: 400 }), req);
  }

  try {
    await prisma.task.delete({ where: { id: parsedParams.data.id } });
    return withCORS(NextResponse.json({ success: true }), req);
  } catch (error) {
    console.error('Ошибка в DELETE /api/tasks/[id]:', error);
    return withCORS(NextResponse.json({ error: 'Не удалось удалить задачу' }, { status: 500 }), req);
  }
}

export async function OPTIONS(req: Request) {
  return corsOptionsResponse(req);
}
