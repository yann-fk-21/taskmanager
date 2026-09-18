export type User = {
  username: string;
  email: string;
  password: string;
};

export type UserCredentials = {
  username: string;
  password: string;
};

export enum statusTask {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export type CreatedTask = {
  title: string;
  description: string;
  status: statusTask;
};

export type CardTask = {
  id: number;
  title: string;
  description: string;
  status: statusTask;
  date: string;
};
