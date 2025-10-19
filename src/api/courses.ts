import { post } from './api';
import type { Course } from '../types/course.types';

interface SaveCoursePayload extends Course {
  eventId: number,
}

export const saveCourse = (course: SaveCoursePayload) => {
  return post('/courses', course);
}