import type { CardTask, CreatedTask } from '../types/types';
import { getTokenFromLocalStorage } from '../utils/utils';

const resolveBackendUrl = (): string => {
  if (import.meta.env.VITE_BACKEND_URL) {
    return import.meta.env.VITE_BACKEND_URL;
  }

  if (import.meta.env.DEV) {
    return 'http://localhost:8080';
  }

  throw new Error(
    'Missing VITE_BACKEND_URL. Set the public Railway backend URL in the frontend environment variables.',
  );
};

const BACKEND_URL = resolveBackendUrl();

const getAuthHeaders = (): HeadersInit => {
  const token = getTokenFromLocalStorage();

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const getTasks = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/tasks`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (task: CreatedTask) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(task),
    });
    return response;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (task: CardTask) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(task),
    });
    return response;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (task: CardTask) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/tasks/${task.id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
