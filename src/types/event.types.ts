import type { Course } from "./course.types";

export interface Event {
  id?: number;
  name?: string;
  date?: string;
  courses?: Course[];
}