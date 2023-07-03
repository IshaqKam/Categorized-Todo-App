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

export async function AddCategory({ name }: { name: string }) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/category`, {
      name,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
