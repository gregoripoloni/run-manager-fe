import { get } from './api';

interface GetAthletesResponse {
  data?: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }[];
  errors?: any;
}

export const getAthletes = (): Promise<GetAthletesResponse> => {
  return get('/athletes');
}

export const getAthletesByCourse = (courseId: number): Promise<GetAthletesResponse> => {
  return get(`/athletes/courses/${courseId}`);
}