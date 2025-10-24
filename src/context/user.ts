import type { Ref, InjectionKey } from 'vue';

export interface User {
  userId: number;
  name: string;
  email: string;
  role: 'ORGANIZER' | 'ATHLETE';
}

interface UserContext {
  user: Ref<User | undefined>;
  updateUser: (authenticatedUser: User) => void;
}

export const userKey: InjectionKey<UserContext> = Symbol('user');