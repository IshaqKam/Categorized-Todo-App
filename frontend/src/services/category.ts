import { API_BASE_URL } from '@/constants/enviroment';
import axios from 'axios';

export async function GetAllCategories(): Promise<ICategory[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/category`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
