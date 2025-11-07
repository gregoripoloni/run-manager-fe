import { post } from './api';

interface SaveRegistrationPayload {
  courseId: number;
}

export const saveRegistration = (registration: SaveRegistrationPayload) => {
  return post('/registrations', registration);
}