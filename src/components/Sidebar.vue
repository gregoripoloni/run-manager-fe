<script setup lang="ts">
  import { ref } from "vue";
  import PanelMenu from "primevue/panelmenu";
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const items = ref([
    {
      label: 'Início',
      icon: 'pi pi-home',
      command: () => {
        router.push('/')
      }
    },
    {
      label: 'Eventos',
      items: [
        {
          label: 'Cadastrar evento',
          icon: 'pi pi-plus-circle',
          command: () => {
            router.push('/events/add')
          }
        },
        {
          label: 'Consultar eventos',
          icon: 'pi pi-list',
        },
      ],
    },
    {
      label: 'Resultados',
      items: [
        {
          label: 'Cadastrar resultados',
          icon: 'pi pi-plus-circle',
        },
      ],
    },
    {
      label: 'Relatórios',
      items: [
        {
          label: 'Relatório de inscrições',
          icon: 'pi pi-chart-bar',
        },
        {
          label: 'Relatório de resultados',
          icon: 'pi pi-chart-bar',
        },
      ],
    },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
    },
  ]);
</script>

<template>
  <div class="fixed flex flex-col items-center w-70 h-full top-0 p-4 pt-19 bg-linear-to-b from-surface-50 to-surface-200 border border-surface-200">
    <img src="/logo.png" />
    <PanelMenu :model="items" class="w-full" />
  </div>
</template>