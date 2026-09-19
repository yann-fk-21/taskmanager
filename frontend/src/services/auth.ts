import type { User, UserCredentials } from '../types/types';

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

export const registerUser = async (user: User): Promise<Response> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (user: UserCredentials): Promise<Response> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
