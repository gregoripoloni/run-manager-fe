import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import EventsListView from '../views/EventsListView.vue';
import EventsAddView from '../views/EventsAddView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/events', component: EventsListView },
  { path: '/events/add', component: EventsAddView },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
