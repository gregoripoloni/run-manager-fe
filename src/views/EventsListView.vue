<script setup lang="ts">
  import { ref } from 'vue';
  import Panel from 'primevue/panel';
  import Button from 'primevue/button';
  import MainPanel from '../components/MainPanel.vue';

  const events = ref([
    {
      name: 'Maratona 1',
      date: '20/10/2025',
    },
    {
      name: 'Maratona 2',
      date: '20/10/2025',
    },
    {
      name: 'Maratona 3',
      date: '20/10/2025',
    },
    {
      name: 'Maratona 4',
      date: '20/10/2025',
    },
    {
      name: 'Maratona 5',
      date: '20/10/2025',
    }
  ]);
</script>

<template>
  <MainPanel title="Eventos">
    <div class="grid grid-cols-3 gap-4">
      <Panel v-for="event in events" :header="event.name">
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