import { NextRequest, NextResponse } from 'next/server';

let tasks: any[] = [];

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    const taskIndex = tasks.findIndex(t => t.id === body.id);
    
    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    // Обновляем только переданные поля
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...body,
      id: tasks[taskIndex].id,
      createdAt: tasks[taskIndex].createdAt
    };
    
    return NextResponse.json(tasks[taskIndex]);
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}