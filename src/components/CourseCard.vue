<script setup lang="ts">
  import Panel from 'primevue/panel';
  import Button from 'primevue/button';
  import type { Course } from '../types/course.types';

  interface Props extends Course {
    header: string;
    showSubscribeButton?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showSubscribeButton: true,
  });

  const emit = defineEmits<{
    (e: 'subscribe'): void;
  }>();
</script>

<template>
  <Panel :header="header">
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-3 gap-4">
        <span>Local de partida: {{ location }}</span>
        <span>Horário de largada: {{ startTime }}</span>
        <span>Distância: {{ distanceKm }} km</span>
        <span>Categoria: {{ category }}</span>
        <span>Vagas: {{ slots }}</span>
      </div>
      <Button v-if="showSubscribeButton" label="Inscrever-se" @click="emit('subscribe')" />
    </div>
  </Panel>
</template>