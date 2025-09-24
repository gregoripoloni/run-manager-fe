<script setup lang="ts">
  import { ref } from 'vue';
  import Panel from 'primevue/panel';
  import InputText from 'primevue/inputtext';
  import Datepicker from 'primevue/datepicker';
  import Button from 'primevue/button';

  const name = ref('');
  const date = new Date();
</script>

<template>
  <Panel header="Cadastrar eventos" class="h-full w-full">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label for="name">Nome do evento</label>
        <InputText id="name" v-model="name" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="date">Data do evento</label>
        <Datepicker id="date" v-model="date" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="date">Percursos</label>
        <Panel>
          <template #header></template>
          <div class="flex flex-col gap-4">
            <Button severity="secondary" label="Adicionar percurso" icon="pi pi-plus" />
          </div>
        </Panel>
      </div>
    </div>
  </Panel>
</template>