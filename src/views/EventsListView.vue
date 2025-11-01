<script setup lang="ts">
  import { ref, onMounted, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import Panel from 'primevue/panel';
  import Button from 'primevue/button';
  import MainPanel from '../components/MainPanel.vue';
  import EventInfo from '../components/EventInfo.vue';
  import { getEventsByOrganizer, getFutureEvents } from '../api/events';
  import { userKey } from '../context/user';

  const router = useRouter();

  const userContext = inject(userKey);

  if (!userContext) {
    throw new Error('User context not provided!');
  }

  const { user } = userContext;

  const events = ref<{
    id: number;
    name: string;
    date: string;
  }[]>([]);

  const addEvent = () => {
    router.push('events/add')
  }

  const viewEvent = ref(false);
  const selectedEvent = ref();

  onMounted(async () => {
    let getEvents;

    if (user.value?.role === 'ORGANIZER') {
      getEvents = getEventsByOrganizer;
    } else {
      getEvents = getFutureEvents;
    }

    const response = await getEvents();

    if (response.data) {
      events.value = response.data;
      events.value = events.value.map((event) => {
        const [ano, mes, dia] = event.date.split("-");
        event.date = `${dia}/${mes}/${ano.slice(2)}`;
        return event;
      });
      events.value = events.value.sort((a, b) => a.id - b.id);
    }
  });
</script>

<template>
  <MainPanel title="Eventos">
    <div class="flex flex-col gap-4">
      <div v-if="user?.role === 'ORGANIZER'" class="flex justify-end">
        <Button label="Cadastrar" icon="pi pi-plus" @click="addEvent" />
      </div>
      <div class="grid grid-cols-3 gap-4">
        <Panel v-for="event in events" :key="event.id" :header="event.name">
          {{ event.date }}
          <template #footer>
            <div class="flex flex-col">
              <Button label="Ver mais" severity="secondary" @click="selectedEvent = event; viewEvent = true;" />
            </div>
          </template>
        </Panel>
      </div>
    </div>
    <EventInfo v-model:visible="viewEvent" :event="selectedEvent" />
  </MainPanel>
</template>