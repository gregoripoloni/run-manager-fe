<script setup lang="ts">
  import Panel from 'primevue/panel';

  defineProps<{
    title: string;
  }>();
</script>

<template>
  <Panel :header="title" class="h-full max-h-full w-full overflow-y-auto !rounded-none !border-none p-10">
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </Panel>
</template>