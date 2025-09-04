import { createTaskSchema } from '../../schemas/task';


test('валидирует корректную задачу', () => {
  const data = {
    text: 'Задача',
    type: 'reminder',
    completed: false,
    dueDate: new Date().toISOString(),
  };

  expect(() => createTaskSchema.parse(data)).not.toThrow();
});

test('отклоняет пустой текст', () => {
  const data = {
    text: '',
    type: 'today',
  };

  expect(() => createTaskSchema.parse(data)).toThrow();
});
