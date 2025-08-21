'use client';

import { Task } from '../types/task';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  showDate?: boolean;
};

export default function TaskItem({ task, onToggle, showDate = false }: TaskItemProps) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className="task-text">{task.text}</span>
      </div>
      
      {showDate && task.dueDate && (
        <span className="task-date">
          {new Date(task.dueDate).toLocaleString()}
        </span>
      )}
    </li>
  );
}