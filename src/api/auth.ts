import { post } from "./api";

export const registerOrganizer = () => {
  return post('/auth/register', {
    name: 'Organizador 3',
    email: 'organizador3@gmail.com',
    password: '123456',
    phone: '5554999999999',
    role: 'ORGANIZER',
    organization: 'Organizadores'
  });
}

interface LoginData {
  email: string;
  password: string;
}

export const loginOrganizer = async (loginData: LoginData) => {
  try {
    const response = await post('/auth/login', loginData);

    if (!response.ok) {
      return {
        ok: false,
        data: await response.json()
      };
    }

    return {
      ok: true,
      data: await response.json()
    };
  } catch {
    return { ok: false };
  }
}