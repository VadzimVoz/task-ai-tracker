import { NextRequest, NextResponse } from 'next/server';

// In-memory хранилище задач (для демонстрации)
let tasks: any[] = [
  {
    id: '1',
    text: 'Пример задачи на сегодня',
    type: 'today',
    completed: false,
    dueDate: null,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    text: 'Пример напоминания',
    type: 'reminder',
    completed: false,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('API Request received:', {
      action: body.action,
      id: body.id,
      text: body.text ? `${body.text.substring(0, 20)}...` : 'none'
    });

    // Получение всех задач
    if (body.action === 'get') {
      console.log('Returning tasks:', tasks.length);
      return NextResponse.json(tasks);
    }
    
    // Создание новой задачи
    if (body.action === 'create') {
      if (!body.text || !body.text.trim()) {
        return NextResponse.json(
          { error: 'Текст обязателен' },
          { status: 400 }
        );
      }

      const newTask = {
        id: Date.now().toString(),
        text: body.text.trim(),
        type: body.type || 'today',
        completed: false,
        dueDate: body.dueDate || null,
        createdAt: new Date().toISOString()
      };
      
      tasks.push(newTask);
      console.log('Task created successfully:', newTask);
      return NextResponse.json(newTask, { status: 201 });
    }
    
    // Обновление задачи
    if (body.action === 'update') {
      if (!body.id) {
        return NextResponse.json(
          { error: 'ID обязателен' },
          { status: 400 }
        );
      }

      const taskIndex = tasks.findIndex(t => t.id === body.id);
      
      if (taskIndex === -1) {
        return NextResponse.json({ error: 'Задача не найдена' }, { status: 404 });
      }
      
      // Обновляем только переданные поля
      const updatedTask = {
        ...tasks[taskIndex],
        ...body.data,
        // Защищаем неизменяемые поля
        id: tasks[taskIndex].id,
        createdAt: tasks[taskIndex].createdAt
      };
      
      tasks[taskIndex] = updatedTask;
      console.log('Task updated successfully:', updatedTask);
      return NextResponse.json(updatedTask);
    }
    
    // Удаление задачи
    if (body.action === 'delete') {
      if (!body.id) {
        return NextResponse.json(
          { error: 'ID обязателен' },
          { status: 400 }
        );
      }

      const taskIndex = tasks.findIndex(t => t.id === body.id);
      
      if (taskIndex === -1) {
        return NextResponse.json({ error: 'Задача не найдена' }, { status: 404 });
      }
      
      const deletedTask = tasks[taskIndex];
      tasks.splice(taskIndex, 1);
      
      console.log('Task deleted successfully:', deletedTask);
      return NextResponse.json({ 
        success: true,
        message: 'Задача удалена',
        deletedTask 
      });
    }
    
    // Удаление всех задач
    if (body.action === 'delete_all') {
      console.log('DELETE_ALL /api/tasks - clearing all tasks');
      const count = tasks.length;
      tasks = [];
      
      console.log(`Cleared ${count} tasks`);
      
      return NextResponse.json({ 
        success: true, 
        message: `Удалено ${count} задач` 
      });
    }
    
    // Неизвестное действие
    return NextResponse.json(
      { error: 'Неизвестное действие' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Неверный формат запроса' },
      { status: 400 }
    );
  }
}

// OPTIONS метод для CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}