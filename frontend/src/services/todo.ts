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
  title,
}: {
  categoryId: string;
  title: string;
}) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/todo/`, {
      title,
      categoryId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
