<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Panel from 'primevue/panel';
  import Button from 'primevue/button';
  import MainPanel from '../components/MainPanel.vue';
  import { getEventsByOrganizer } from '../api/events';

  const events = ref<{
    id: number;
    name: string;
    date: string;
  }[]>([]);

  onMounted(async () => {
    const response = await getEventsByOrganizer();

    if (response.data) {
      events.value = response.data;
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