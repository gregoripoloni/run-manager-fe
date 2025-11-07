<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import Panel from 'primevue/panel';
  import Datepicker from 'primevue/datepicker';
  import Button from 'primevue/button';
  import FormField from './FormField.vue';
  import CourseCard from './CourseCard.vue';
  import { useFormFields } from '../composables/useFormFields';
  import type { Course } from '../types/course.types';

  const emit = defineEmits<{
    (e: 'addCourse', course: Course): void;
  }>();

  const isAdding = ref(false);

  const { form, resetForm } = useFormFields({
    location: '',
    startTime: new Date(),
    distanceKm: '',
    category: '',
    slots: '',
  });

  const courses = reactive<Course[]>([]);

  const addCourse = () => {
    isAdding.value = true;
  }

  const saveCourse = () => {
    if (!validateCourse()) {
      return;
    }

    isAdding.value = false;

    const course = {
      location: form.location.value,
      startTime: form.startTime.value.toLocaleTimeString('pt-BR', { hour12: false }),
      distanceKm: parseInt(form.distanceKm.value),
      category: form.category.value,
      slots: parseInt(form.slots.value),
    };

    courses.push(course);

    emit('addCourse', course);

    resetForm();
  }

  const validateCourse = () => {
    let isValid = true;

    for (const field of Object.values(form)) {
      if (!field.value) {
        field.error = true;
        field.errorMessage = 'não deve estar em branco';
        isValid = false;
      } else {
        field.error = false;
        field.errorMessage = '';
      }
    }

    return isValid;
  }

  const cancelCourse = () => {
    isAdding.value = false;
    resetForm();
  }
</script>

<template>
  <Panel class="courses-form-main-panel">
    <div class=" flex flex-col gap-2">
      <CourseCard
        v-for="(course, index) in courses"
        :header="`Percurso ${index + 1}`"
        :show-subscribe-button="false"
        v-bind="course"
        toggleable
        collapsed
      />
      <Panel v-if="isAdding" header="Novo percurso">
        <div class="grid grid-cols-2 gap-4">
          <FormField
            label="Local de partida"
            v-model="form.location.value"
            :invalid="form.location.error"
            :error-message="form.location.errorMessage"
          />
          <FormField
            label="Horário de largada"
            :error-message="form.startTime.errorMessage"
          >
            <Datepicker
              v-model="form.startTime.value"
              showIcon
              iconDisplay="input"
              timeOnly
              :invalid="form.startTime.error"
            >
              <template #inputicon="slotProps">
                <i class="pi pi-clock" @click="slotProps.clickCallback" />
              </template>
            </Datepicker>
          </FormField>
          <FormField
            label="Distância (Km)"
            type="number"
            v-model="form.distanceKm.value"
            :invalid="form.distanceKm.error"
            :error-message="form.distanceKm.errorMessage"
          />
          <FormField
            label="Categoria"
            v-model="form.category.value"
            :invalid="form.category.error"
            :error-message="form.category.errorMessage"
          />
          <FormField
            label="Vagas"
            type="number"
            v-model="form.slots.value"
            :invalid="form.slots.error"
            :error-message="form.slots.errorMessage"
          />
        </div>
        <template #footer>
          <div class="flex gap-4 w-full justify-end">
            <Button label="Cancelar" severity="secondary" @click="cancelCourse" />
            <Button label="Adicionar" icon="pi pi-check" @click="saveCourse" />
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
