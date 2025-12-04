import { post } from './api';

interface SaveResultPayload {
  registrationId: number;
  time: string;
}

export const saveResult = (courseId: number, result: SaveResultPayload) => {
  return post(`/results/${courseId}`, [result]);
}