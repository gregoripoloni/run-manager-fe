<script setup lang="ts">
  import Menu from './components/Menu.vue'
  import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <Menu />
  <div class="flex h-full pt-15">
    <main class="grid grid-cols-4 gap-10 items-center justify-center w-full min-h-full p-10">
      <Sidebar class="col-span-1" />
      <RouterView class="col-span-3" />
    </main>
  </div>
</template>
