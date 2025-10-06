import { post } from "./api";

export const registerEvent = () => {
  return post('/events', {
    name: 'Primeiro evento',
    date: new Date(),
  })
}