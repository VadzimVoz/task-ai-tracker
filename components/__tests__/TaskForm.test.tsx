import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../TaskForm';

describe('TaskForm', () => {
  it('submits text and clears input', async () => {
    const handleSubmit = jest.fn().mockResolvedValue(undefined);
    render(<TaskForm onSubmit={handleSubmit} placeholder="Добавить задачу" />);

    const input = screen.getByPlaceholderText('Добавить задачу');
    const button = screen.getByRole('button', { name: /добавить/i });

    await userEvent.type(input, 'Новая задача');
    await userEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledWith('Новая задача');

    // Ждём, пока поле очистится
    await screen.findByDisplayValue('');
  });
});
