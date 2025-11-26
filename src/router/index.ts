import { createMemoryHistory, createRouter } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import EventsListView from '../views/EventsListView.vue';
import EventsAddView from '../views/EventsAddView.vue';
import TeamsAddView from '../views/TeamsAddView.vue';
import ResultsAddView from '../views/ResultsAddView.vue';
import ReportsView from '../views/ReportsView.vue';

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/events', component: EventsListView },
  { path: '/events/add', component: EventsAddView },
  { path: '/teams/add', component: TeamsAddView },
  { path: '/results/add', component: ResultsAddView },
  { path: '/reports', component: ReportsView },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});