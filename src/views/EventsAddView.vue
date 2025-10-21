<script setup lang="ts">
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import InputText from 'primevue/inputtext';
  import Datepicker from 'primevue/datepicker';
  import Message from 'primevue/message';
  import Button from 'primevue/button';
  import MainPanel from '../components/MainPanel.vue';
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
    router.back();
  }
</script>

<template>
  <MainPanel title="Cadastrar eventos">
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <label for="name">Nome do evento</label>
          <InputText id="name" v-model="form.name.value" :invalid="form.name.error" />
          <Message v-if="form.name.error" severity="error" size="small" variant="simple">
            {{ form.name.errorMessage }}
          </Message>
        </div>
        <div class="flex flex-col gap-2">
          <label for="date">Data do evento</label>
          <Datepicker id="date" v-model="form.date.value" dateFormat="dd/mm/y" showIcon iconDisplay="input" :invalid="form.date.error" />
          <Message v-if="form.date.error" severity="error" size="small" variant="simple">
            {{ form.date.errorMessage }}
          </Message>
        </div>
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