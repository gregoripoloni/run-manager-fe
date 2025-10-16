<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import Panel from 'primevue/panel';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import type { Course } from '../types/course.types';

  const emit = defineEmits<{
    (e: 'addCourse', course: Course): void;
  }>();

  const isAdding = ref(false);
  const place = ref('');
  const distance = ref('');
  const category = ref('');
  const slots = ref('');

  const courses = reactive<Course[]>([]);

  const addCourse = () => {
    isAdding.value = true;
  }

  const saveCourse = () => {
    isAdding.value = false;

    const course = {
      place: place.value,
      distance: distance.value,
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
    place.value = '';
    distance.value = '';
    category.value = '';
    slots.value = '';
  }
</script>

<template>
  <Panel class="courses-form-main-panel">
    <div class=" flex flex-col gap-2">
      <Panel v-for="course in courses" :header="course.place" toggleable collapsed>
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label>Local de partida</label>
            <InputText :value="course.place" disabled />
          </div>
          <div class="flex flex-col gap-2">
            <label>Distância</label>
            <InputText :value="course.distance" disabled />
          </div>
          <div class="flex flex-col gap-2">
            <label>Categoria</label>
            <InputText :value="course.category" disabled />
          </div>
          <div class="flex flex-col gap-2">
            <label>Vagas</label>
            <InputText :value="course.slots" disabled />
          </div>
        </div>
      </Panel>
      <Panel v-if="isAdding" header="Novo percurso">
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label for="place">Local de partida</label>
            <InputText id="place" v-model="place" />
          </div>
          <div class="flex flex-col gap-2">
            <label for="distance">Distância</label>
            <InputText id="distance" v-model="distance" />
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
