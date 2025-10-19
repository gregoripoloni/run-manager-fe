<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import InputText from 'primevue/inputtext';
  import Datepicker from 'primevue/datepicker';
  import Button from 'primevue/button';
  import MainPanel from '../components/MainPanel.vue';
  import CoursesForm from '../components/CoursesForm.vue';
  import { saveEvent } from '../api/events';
  import { saveCourse } from '../api/courses';
  import type { Course } from '../types/course.types';

  const router = useRouter();

  const name = ref('');
  const date = ref(new Date());

  const courses = reactive<Course[]>([]);

  const addCourse = (course: Course) => {
    courses.push(course);
  }

  const addEvent = async () => {
    const response = await saveEvent({
      name: name.value,
      date: date.value,
    });

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
</script>

<template>
  <MainPanel title="Cadastrar eventos">
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-2">
          <label for="name">Nome do evento</label>
          <InputText id="name" v-model="name" />
        </div>
        <div class="flex flex-col gap-2">
          <label for="date">Data do evento</label>
          <Datepicker id="date" v-model="date" dateFormat="dd/mm/y" showIcon iconDisplay="input" />
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <label for="date">Percursos</label>
        <CoursesForm @add-course="addCourse" />
      </div>
    </div>
    <template #footer>
      <div class="flex gap-4 w-full justify-end">
        <Button label="Cancelar" severity="secondary" />
        <Button label="Salvar" icon="pi pi-check" @click="addEvent" />
      </div>
    </template>
  </MainPanel>
</template>