<script setup lang="ts">
  import Panel from 'primevue/panel';

  defineProps<{
    title: string;
  }>();
</script>

<template>
  <Panel :header="title" class="h-full w-full !bg-linear-to-b from-surface-0 to-surface-50">
    <slot></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </Panel>
</template>