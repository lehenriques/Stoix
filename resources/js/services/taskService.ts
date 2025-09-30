import axios from 'axios';
import { Task, TaskFormData } from '@/types/task';

const API_URL = 'http://localhost:8000/api/tasks';

let csrfToken: string | null = null;

const getCsrfToken = async (): Promise<string> => {
  if (csrfToken) return csrfToken;

  const response = await axios.get('http://localhost:8000/api/csrf-token', {
    withCredentials: true,
  });
  csrfToken = response.data.token;
  return csrfToken;
};

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method || '')) {
    const token = await getCsrfToken();
    config.headers['X-CSRF-TOKEN'] = token;
  }
  return config;
});

export const taskService = {
  async getAllTasks(): Promise<Task[]> {
    const response = await apiClient.get<Task[]>('');
    return response.data;
  },

  async getTask(id: number): Promise<Task> {
    const response = await apiClient.get<Task>(`/${id}`);
    return response.data;
  },

  async createTask(task: TaskFormData): Promise<Task> {
    const response = await apiClient.post<Task>('', task);
    return response.data;
  },

  async updateTask(id: number, task: Partial<TaskFormData>): Promise<Task> {
    const response = await apiClient.put<Task>(`/${id}`, task);
    return response.data;
  },

  async deleteTask(id: number): Promise<void> {
    await apiClient.delete(`/${id}`);
  },
};
