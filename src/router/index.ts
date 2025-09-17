import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import EventsView from '../views/EventsView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/events', component: EventsView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
