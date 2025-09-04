import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { createTaskSchema } from '../../../schemas/task';


// GET: Получить все задачи из базы данных
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('❌ Ошибка при получении задач:', error);
    return NextResponse.json({ error: 'Ошибка сервера при получении задач' }, { status: 500 });
  }
}

// POST: Создать новую задачу в базе данных
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createTaskSchema.safeParse(body);

    if (!parsed.success) {
      console.error('❌ Ошибка валидации:', parsed.error.format());
      return NextResponse.json({ error: 'Неверные данные задачи' }, { status: 400 });
    }

    const { text, type, completed = false, dueDate } = parsed.data;

    const newTask = await prisma.task.create({
      data: {
        text,
        type,
        completed,
        dueDate: dueDate ? new Date(dueDate) : null,
      },
    });

    console.log('✅ Задача создана:', newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('❌ Ошибка при создании задачи:', error);
    return NextResponse.json({ error: 'Ошибка сервера при создании задачи' }, { status: 500 });
  }
}

// OPTIONS: для CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
