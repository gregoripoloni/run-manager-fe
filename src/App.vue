<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import Menu from './components/Menu.vue'
  import Sidebar from './components/Sidebar.vue';

  const route = useRoute();

  const inUnauthenticatedRoutes = computed(() => {
    return ['/login', '/signin'].includes(route.path);
  });
</script>

<template>
  <Menu v-if="!inUnauthenticatedRoutes" />
  <div class="flex h-full pt-15">
    <main class="grid grid-cols-4 gap-10 w-full min-h-full p-10">
      <Sidebar v-if="!inUnauthenticatedRoutes" class="col-span-1" />
      <RouterView :class="!inUnauthenticatedRoutes ? 'col-span-3' : 'col-span-4'" />
    </main>
  </div>
</template>
