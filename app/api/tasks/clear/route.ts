import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    console.log('Clearing all tasks from database');
    
    // Удаляем все задачи
    const result = await prisma.task.deleteMany();
    
    console.log(`Cleared ${result.count} tasks`);
    
    return NextResponse.json({ 
      success: true, 
      message: `Удалено ${result.count} задач`,
      count: result.count
    });
    
  } catch (error) {
    console.error('Clear tasks error:', error);
    return NextResponse.json(
      { error: 'Failed to clear tasks' },
      { status: 500 }
    );
  }
}