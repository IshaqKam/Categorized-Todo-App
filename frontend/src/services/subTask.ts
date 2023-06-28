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
    const response = await axios.put(
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
