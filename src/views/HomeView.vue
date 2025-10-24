<script setup lang="ts">
  import { inject } from 'vue';
  import MainPanel from '../components/MainPanel.vue';
  import { userKey } from '../context/user';

  const userContext = inject(userKey);

  if (!userContext) {
    throw new Error('User context not provided!');
  }

  const { user } = userContext;
</script>

<template>
  <MainPanel :title="`Bem vindo, ${user?.name}!`" />
</template>