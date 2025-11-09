import { post } from './api';

interface SaveTeamPayload {
  name: string;
  responsibleId: number;
  memberIds: number[];
}

export const saveTeam = (team: SaveTeamPayload) => {
  return post('/teams', team);
}