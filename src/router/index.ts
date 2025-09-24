import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import EventsAddView from '../views/EventsAddView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/events/add', component: EventsAddView },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
