<script setup lang="ts">
  import { ref, inject } from "vue";
  import Panel from "primevue/panel";
  import PanelMenu from "primevue/panelmenu";
  import { useRouter } from 'vue-router';
  import { userKey } from '../context/user';

  const userContext = inject(userKey);

  if (!userContext) {
    throw new Error('User context not provided!');
  }

  const { user } = userContext;

  const router = useRouter();

  const items = ref([
    {
      label: 'Início',
      icon: 'pi pi-home',
      command: () => {
        router.push('/');
      }
    },
    {
      label: 'Eventos',
      icon: 'pi pi-calendar',
      command: () => {
        router.push('/events');
      },
    },
  ]);

  if (user.value?.role === 'ORGANIZER') {
    items.value.push({
      label: 'Resultados',
      icon: 'pi pi-crown',
      command: () => {
        router.push('/results/add');
      },
    });
    items.value.push({
      label: 'Relatórios',
      icon: 'pi pi-chart-bar',
      command: () => {
        router.push('/reports')
      },
    });
  } else {
    items.value.push({
      label: 'Grupos',
      icon: 'pi pi-users',
      command: () => {
        router.push('/teams/add');
      },
    });
  }

  items.value.push({
    label: 'Sair',
    icon: 'pi pi-sign-out',
    command: () => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      router.push('/login');
    },
  });
</script>

<template>
  <Panel header="Acessar" class="flex flex-col h-full items-center !bg-linear-to-b from-surface-0 to-surface-50 !rounded-none !border-t-0 !border-b-0 !border-l-0 py-10">
    <PanelMenu :model="items" multiple class="w-full">
      <template #item="{ item }">
        <a v-ripple class="flex items-center gap-2 px-4 py-2 cursor-pointer group">
          <span v-if="item.icon" :class="item.icon" />
          <span>{{ item.label }}</span>
          <span v-if="item.items" class="pi pi-angle-down ml-auto" />
        </a>
      </template>
    </PanelMenu>
  </Panel>
</template>