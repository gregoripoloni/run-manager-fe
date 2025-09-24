<script setup lang="ts">
  import Menu from './components/Menu.vue'
  import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <Menu />
  <div class="flex h-full pt-15">
    <Sidebar />
    <main class="flex items-center justify-center w-full min-h-full p-10 pl-80">
      <RouterView />
    </main>
  </div>
</template>
