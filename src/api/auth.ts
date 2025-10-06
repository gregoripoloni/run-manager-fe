import { post } from './api';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'ORGANIZER' | 'ATHLETE';
  organization?: string;
}

interface RegisterResponse {
  data?: {
    userId: number;
    token: string;
    name: string;
    email: string;
    role: string;
  };
  errors?: {
    name: string;
    email: string;
    password: string;
  };
}

export const registerOrganizer = (registerPayload: RegisterPayload): Promise<RegisterResponse> => {
  return post('/auth/register', registerPayload);
}

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  data?: {
    userId: number;
    token: string;
    name: string;
    email: string;
    role: string;
  };
  errors?: {
    email: string;
    password: string;
  };
}

export const loginOrganizer = (loginPayload: LoginPayload): Promise<LoginResponse> => {
  return post('/auth/login', loginPayload);
}
