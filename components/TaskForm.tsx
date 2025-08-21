'use client';

import { FormEvent, useState } from 'react';

type TaskFormProps = {
  onSubmit: (text: string) => void;
  placeholder: string;
  disabled?: boolean;
};

export default function TaskForm({ onSubmit, placeholder, disabled = false }: TaskFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="task-input"
        disabled={disabled}
      />
      <button 
        type="submit" 
        className="add-button"
        disabled={disabled || !text.trim()}
      >
        {disabled ? 'Добавление...' : 'Добавить'}
      </button>
    </form>
  );
}