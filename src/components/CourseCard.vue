<script setup lang="ts">
  import Panel from 'primevue/panel';
  import Button from 'primevue/button';
  import Message from 'primevue/message';
  import type { Course } from '../types/course.types';

  interface Props extends Course {
    header: string;
    showSubscribeButton?: boolean;
    isSubscribed?: boolean;
    errorMessage?: string;
    successMessage?: string;
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
        <div class="flex flex-col gap-2">
          <span class="font-semibold">Local de partida:</span>
          <span>{{ location }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="font-semibold">Horário de largada:</span>
          <span>{{ startTime }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="font-semibold">Distância:</span>
          <span>{{ distanceKm }} km</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="font-semibold">Categoria:</span>
          <span>{{ category }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="font-semibold">Vagas:</span>
          <span>{{ slots }}</span>
        </div>
      </div>
      <Button
        v-if="showSubscribeButton"
        :severity="isSubscribed ? 'secondary' : undefined"
        :label="isSubscribed ? 'Inscrito' : 'Inscrever-se'"
        :disabled="isSubscribed"
        @click="emit('subscribe')"
      />
      <Message v-if="errorMessage" severity="error" size="small" variant="simple">
        {{ errorMessage }}
      </Message>
      <Message v-if="successMessage" severity="success" size="small" variant="simple">
        {{ successMessage }}
      </Message>
    </div>
  </Panel>
</template>