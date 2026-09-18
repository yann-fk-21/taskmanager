import { jwtDecode } from 'jwt-decode';
import type { CardTask } from '../types/types';

export const saveTokenInLocalStorage = (token: string): void => {
  localStorage.setItem('token', token);
};

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem('token');
};

export const decodeToken = (token: string) => {
  const decodedToken = jwtDecode(token);
  return decodedToken;
};

export const removeTokenFromLocalStorage = (): void => {
  localStorage.removeItem('token');
};

export const isTokenValid = () => {
  const token = getTokenFromLocalStorage();
  if (!token) {
    return false;
  }
  const decodedToken = decodeToken(token);
  const expirationTime = decodedToken.exp ? decodedToken.exp * 1000 : 0;
  const currentTime = Date.now();
  console.log('Decoded token:', decodedToken);
  return currentTime < expirationTime;
};

export const formatDate = (
  value: string | Date,
  monthStyle: 'long' | 'short' = 'long',
): string => {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: monthStyle,
    day: 'numeric',
    year: 'numeric',
  }).format(date);

  if (monthStyle === 'short' && !formattedDate.includes('.')) {
    return formattedDate.replace(/^([A-Za-z]{3})/, '$1.');
  }

  return formattedDate;
};

export const searchTask = (
  tasks: CardTask[],
  searchTerm: string,
): CardTask[] => {
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase();

  if (!normalizedSearchTerm) {
    return tasks;
  }

  return tasks.filter((task) =>
    task.title.toLocaleLowerCase().includes(normalizedSearchTerm),
  );
};
