<script setup lang="ts">
  import { ref } from "vue";
  import Panel from "primevue/panel";
  import PanelMenu from "primevue/panelmenu";
  import { useRouter } from 'vue-router';

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
      items: [
        {
          label: 'Cadastrar',
          command: () => {
            router.push('/events/add');
          }
        },
        {
          label: 'Consultar',
          command: () => {
            router.push('/events');
          }
        },
      ],
    },
    {
      label: 'Resultados',
      icon: 'pi pi-crown',
      items: [
        {
          label: 'Cadastrar',
        },
      ],
    },
    {
      label: 'Relatórios',
      icon: 'pi pi-chart-bar',
      items: [
        {
          label: 'Inscrições',
        },
        {
          label: 'Resultados',
        },
      ],
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => {
        localStorage.removeItem('jwt');
        router.push('/login');
      }
    },
  ]);
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