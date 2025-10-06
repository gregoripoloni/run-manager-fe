<script setup lang="ts">
  import Button from 'primevue/button';
  import { registerEvent } from '../api/events';
</script>

<template>
  <div>
    <h1>Hello World!</h1>
    <Button @click="registerEvent">Registrar evento</Button>
  </div>
</template>