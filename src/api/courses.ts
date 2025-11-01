import { post, get } from './api';
import type { Course } from '../types/course.types';

interface SaveCoursePayload extends Course {
  eventId: number,
}

export const saveCourse = (course: SaveCoursePayload) => {
  return post('/courses', course);
}

export const getCoursesByEvent = (eventId: number) => {
  return get(`/events/${eventId}/courses`);
}