import { post, get } from "./api";

interface SaveEventPayload {
  name: string;
  date: Date;
}

export const saveEvent = async (event: SaveEventPayload) => {
  return post('/events', event);
}

interface GetEventsResponse {
  data?: {
    id: number;
    name: string;
    date: string;
  }[];
  errors?: any;
}

export const getEventsByOrganizer = async (): Promise<GetEventsResponse> => {
  return get('/events-organizer/');
}