import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// TodoAPI 모킹
jest.mock('./services/todoService', () => ({
  selectTodoList: jest.fn(() => Promise.resolve([])),
  createTodoItem: jest.fn(() => Promise.resolve()),
  updateTodoItem: jest.fn(() => Promise.resolve()),
  deleteTodoItem: jest.fn(() => Promise.resolve()),
}));

describe('App Component', () => {
  test('renders todo app title', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('📝 Todo App')).toBeInTheDocument();
    });
  });

  test('renders todo container', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('오늘 할 일을 정리해보세요')).toBeInTheDocument();
    });
  });

  test('renders todo input form', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByPlaceholderText('할 일을 입력하세요')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '추가' })).toBeInTheDocument();
    });
  });
});
