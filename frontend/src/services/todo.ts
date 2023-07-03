import { API_BASE_URL } from '@/constants/enviroment';
import axios from 'axios';

export async function UpdateTodoStatus({
  todoId,
  completed,
}: {
  todoId: string;
  completed: boolean;
}) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/api/todo/${todoId}`, {
      completed,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function AddTodo({
  categoryId,
  due_date,
  title,
}: {
  title: string;
  due_date: string;
  categoryId: string;
}) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/todo/`, {
      title,
      due_date,
      categoryId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
