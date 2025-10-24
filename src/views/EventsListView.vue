<script setup lang="ts">
  import { ref, onMounted, inject } from 'vue';
  import Panel from 'primevue/panel';
  import Button from 'primevue/button';
  import MainPanel from '../components/MainPanel.vue';
  import { getEventsByOrganizer, getFutureEvents } from '../api/events';
  import { userKey } from '../context/user';

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
    <div class="grid grid-cols-3 gap-4">
      <Panel v-for="event in events" :key="event.id" :header="event.name">
        {{ event.date }}
        <template #footer>
          <div class="flex flex-col">
            <Button label="Ver mais" severity="secondary" />
          </div>
        </template>
      </Panel>
    </div>
  </MainPanel>
</template>