<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import Panel from 'primevue/panel';
  import InputText from 'primevue/inputtext';
  import Datepicker from 'primevue/datepicker';
  import Button from 'primevue/button';
  import type { Course } from '../types/course.types';

  const emit = defineEmits<{
    (e: 'addCourse', course: Course): void;
  }>();

  const isAdding = ref(false);
  const location = ref('');
  const startTime = ref(new Date());
  const distanceKm = ref('');
  const category = ref('');
  const slots = ref('');

  const courses = reactive<Course[]>([]);

  const addCourse = () => {
    isAdding.value = true;
  }

  const saveCourse = () => {
    isAdding.value = false;

    const course = {
      location: location.value,
      startTime: startTime.value.toLocaleTimeString('pt-BR', { hour12: false }),
      distanceKm: parseInt(distanceKm.value),
      category: category.value,
      slots: parseInt(slots.value),
    };

    courses.push(course);

    emit('addCourse', course);

    clearForm();
  }

  const cancelCourse = () => {
    isAdding.value = false;
    clearForm();
  }

  const clearForm = () => {
    location.value = '';
    startTime.value = new Date();
    distanceKm.value = '';
    category.value = '';
    slots.value = '';
  }
</script>

<template>
  <Panel class="courses-form-main-panel">
    <div class=" flex flex-col gap-2">
      <Panel v-for="course in courses" :header="course.location" toggleable collapsed>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label>Local de partida</label>
            <InputText :value="course.location" readonly />
          </div>
          <div class="flex flex-col gap-2">
            <label>Horário de largada</label>
            <InputText :value="course.startTime" readonly />
          </div>
          <div class="flex flex-col gap-2">
            <label>Distância</label>
            <InputText :value="course.distanceKm" readonly />
          </div>
          <div class="flex flex-col gap-2">
            <label>Categoria</label>
            <InputText :value="course.category" readonly />
          </div>
          <div class="flex flex-col gap-2">
            <label>Vagas</label>
            <InputText :value="course.slots" readonly />
          </div>
        </div>
      </Panel>
      <Panel v-if="isAdding" header="Novo percurso">
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label for="location">Local de partida</label>
            <InputText id="location" v-model="location" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="startTime">Horário de largada</label>
            <Datepicker id="startTime" v-model="startTime" showIcon iconDisplay="input" timeOnly>
              <template #inputicon="slotProps">
                <i class="pi pi-clock" @click="slotProps.clickCallback" />
              </template>
            </Datepicker>
          </div>
          <div class="flex flex-col gap-2">
            <label for="distanceKm">Distância (Km)</label>
            <InputText id="distanceKm" type="number" v-model="distanceKm" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="category">Categoria</label>
            <InputText id="category" v-model="category" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="slots">Vagas</label>
            <InputText id="slots" type="number" v-model="slots" />
          </div>
        </div>
        <template #footer>
          <div class="flex gap-4 w-full justify-end">
            <Button label="Cancelar" severity="secondary" @click="cancelCourse" />
            <Button label="Salvar" icon="pi pi-check" @click="saveCourse" />
          </div>
        </template>
      </Panel>
      <div v-if="!isAdding" class="flex flex-col">
        <Button label="Adicionar percurso" icon="pi pi-plus" @click="addCourse" />
      </div>
    </div>
  </Panel>
</template>

<style scoped>
  .courses-form-main-panel > :deep(.p-panel-header) {
    padding-bottom: 0;
  }
</style>
