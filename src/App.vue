<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import Menu from './components/Menu.vue'
  import Sidebar from './components/Sidebar.vue';

  const route = useRoute();
  const router = useRouter();

  const inUnauthenticatedRoutes = computed(() => {
    return ['/login', '/register'].includes(route.path);
  });

  if (!localStorage.getItem('jwt')) {
    router.push('/login');
  }
</script>

<template>
  <Menu v-if="!inUnauthenticatedRoutes" />
  <div class="flex h-full pt-15">
    <main class="grid grid-cols-4 gap-5 w-full min-h-full">
      <Sidebar v-if="!inUnauthenticatedRoutes" class="col-span-1" />
      <RouterView :class="!inUnauthenticatedRoutes ? 'col-span-3' : 'col-span-4'" />
    </main>
  </div>
</template>
