<script setup lang="ts">
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import Datepicker from 'primevue/datepicker';
  import Button from 'primevue/button';
  import MainPanel from '../components/MainPanel.vue';
  import FormField from '../components/FormField.vue';
  import CoursesForm from '../components/CoursesForm.vue';
  import { useFormFields } from '../composables/useFormFields';
  import { saveEvent } from '../api/events';
  import { saveCourse } from '../api/courses';
  import type { Course } from '../types/course.types';

  const router = useRouter();

  const { form, setFieldError, clearFieldError } = useFormFields({
    name: '',
    date: new Date(),
  });

  const courses = reactive<Course[]>([]);

  const addCourse = (course: Course) => {
    courses.push(course);
  }

  const addEvent = async () => {
    const response = await saveEvent({
      name: form.name.value,
      date: form.date.value,
    });

    if (response.errors) {
      if (response.errors.name) {
        setFieldError('name', response.errors.name);
      } else {
        clearFieldError('name');
      }

      if (response.errors.date) {
        setFieldError('date', response.errors.date);
      } else {
        clearFieldError('date');
      }

      return;
    }

    if (response.data) {
      for (const course of courses) {
        await saveCourse({
          ...course,
          eventId: response.data.id,
        });
      }

      router.push('/events');
    }
  }

  const cancelEvent = () => {
    router.push('/events');
  }
</script>

<template>
  <MainPanel title="Cadastrar eventos">
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-4">
        <FormField
          label="Nome do evento"
          v-model="form.name.value"
          :invalid="form.name.error"
          :error-message="form.name.errorMessage"
        />
        <FormField
          label="Data do evento"
          :error-message="form.date.errorMessage"
        >
          <Datepicker
            v-model="form.date.value"
            dateFormat="dd/mm/y"
            showIcon iconDisplay="input"
            :invalid="form.date.error"
          />
        </FormField>
      </div>
      <div class="flex flex-col gap-2">
        <label for="date">Percursos</label>
        <CoursesForm @add-course="addCourse" />
      </div>
    </div>
    <template #footer>
      <div class="flex gap-4 w-full justify-end">
        <Button label="Cancelar" severity="secondary" @click="cancelEvent" />
        <Button label="Salvar" icon="pi pi-check" @click="addEvent" />
      </div>
    </template>
  </MainPanel>
</template>