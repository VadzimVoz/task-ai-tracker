export async function fetchTasks() {
  const res = await fetch('/api/tasks');
  return res.json();
}

export async function createTask(task: any) {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
}

export async function updateTask(id: string, updates: any) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json();
}

export async function deleteTask(id: string) {
  await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
}
