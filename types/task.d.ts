export interface Task {
  id: string;
  text: string;
  type: 'today' | 'reminder';
  completed: boolean;
  dueDate: string | null;
  createdAt: string;
}