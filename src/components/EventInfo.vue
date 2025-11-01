<script setup lang="ts">
  import { ref, watch } from 'vue';
  import Dialog from 'primevue/dialog';
  import Panel from 'primevue/panel';
  import Button from 'primevue/button';
  import { getCoursesByEvent } from '../api/courses';
  import type { Event } from '../types/event.types';
  import type { Course } from '../types/course.types';

  const visible = defineModel<boolean>('visible');

  const props = defineProps<{
    event?: Event;
  }>();

  const courses = ref<Course[]>();

  const getCourses = async () => {
    if (!props.event?.id) {
      return;
    }

    // const response = await getCoursesByEvent(props.event.id);

    const response = {
      data: [
        { location: 'Centro', startTime: '22:00', distanceKm: 10, category: 'Maratona', slots: 100 },
        { location: 'Centro', startTime: '22:00', distanceKm: 10, category: 'Maratona', slots: 100 },
      ],
    };

    if (response.data) {
      courses.value = response.data;
    }
  }

  watch(() => props.event, getCourses);
</script>

<template>
  <Dialog v-model:visible="visible" modal :header="event?.name" :style="{ width: '50rem' }">
    <div class="flex flex-col gap-4">
      <span>Data: {{ event?.date }}</span>
      <Panel v-for="(course, index) in courses" :header="`Percurso ${index + 1}`">
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-3 gap-4">
            <span>Local de partida: {{ course.location }}</span>
            <span>Distância: {{ course.distanceKm }} km</span>
            <span>Horário de largada: {{ course.startTime }}</span>
            <span>Categoria: {{ course.category }}</span>
            <span>Vagas: {{ course.slots }}</span>
          </div>
          <Button label="Inscrever-se" />
        </div>
      </Panel>
    </div>
  </Dialog>
</template>