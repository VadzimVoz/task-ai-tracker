'use client';

import { useState } from 'react';
import { Task } from '../types/task';

type AddTaskProps = {
  onAdd: (taskText: string) => void;
  taskType: 'today' | 'reminder';
};

export default function AddTask({ onAdd, taskType }: AddTaskProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={`Добавить ${taskType === 'reminder' ? 'напоминание' : 'задачу'}...`}
        className="flex-1 p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Добавить
      </button>
    </form>
  );
}