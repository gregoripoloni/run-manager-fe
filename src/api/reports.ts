import { get } from './api';

interface GetRegistrationReportResponse {
  data?: {
    courseId: number;
    courseCategory: string;
    courseLocation: string;
    totalInscritos: number;
    atletas: {
      id: number;
      name: string;
      email: string;
    }[];
  }[];
  errors?: any;
}

export const getRegistrationReport = (eventId: number): Promise<GetRegistrationReportResponse> => {
  return get(`/reports/events/${eventId}/inscritos`);
}

interface GetRankingReportResponse {
  data?: {
    courseId: number;
    courseCategory: string;
    ranking: {
        position: number;
        registrationId: number;
        athleteName: string;
        elapsedSeconds: number;
    }[];
  }[];
  errors?: any;
}

export const getRankingReport = (eventId: number): Promise<GetRankingReportResponse> => {
  return get(`/reports/events/${eventId}/ranking`);
  // Temporary fake data for development / UI work
  // return Promise.resolve({
  //   data: [
  //     {
  //       courseId: eventId,
  //       courseCategory: 'Adult',
  //       ranking: [
  //         { position: 1, registrationId: 101, athleteName: 'Alice Silva', elapsedSeconds: 3600 },
  //         { position: 2, registrationId: 102, athleteName: 'Bruno Souza', elapsedSeconds: 3705 },
  //         { position: 3, registrationId: 103, athleteName: 'Carla Dias', elapsedSeconds: 3890 },
  //       ],
  //     },
  //   ],
  // });
}