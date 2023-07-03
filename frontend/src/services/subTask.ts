import { API_BASE_URL } from '@/constants/enviroment';
import axios from 'axios';

export async function UpdateSubtaskStatus({
  subtaskId,
  completed,
}: {
  subtaskId: string;
  completed: boolean;
}) {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/subtask/${subtaskId}`,
      {
        completed,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function AddSubtask({
  title,
  todoId,
}: {
  title: string;
  todoId: string;
}) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/subtask/`, {
      title,
      todoId,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
