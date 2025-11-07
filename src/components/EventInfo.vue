<script setup lang="ts">
  import { ref, watch, inject } from 'vue';
  import Dialog from 'primevue/dialog';
  import { getCoursesByEvent } from '../api/courses';
  import CourseCard from './CourseCard.vue';
  import type { Event } from '../types/event.types';
  import type { Course } from '../types/course.types';
  import { userKey } from '../context/user';
  import { saveRegistration } from '../api/registrations';

  const userContext = inject(userKey);

  if (!userContext) {
    throw new Error('User context not provided!');
  }

  const { user } = userContext;

  const visible = defineModel<boolean>('visible');

  const props = defineProps<{
    event?: Event;
  }>();

  const courses = ref<Course[]>();

  const getCourses = async () => {
    if (!props.event?.id) {
      return;
    }

    const response = await getCoursesByEvent(props.event.id);

    if (response.data) {
      courses.value = response.data;
    }
  }

  const subscribe = async (courseId: number | undefined) => {
    if (!courseId) return;

    const response = await saveRegistration({ courseId: courseId });

    if (response.errors) {
      alert('error');
      return;
    }

    if (response.data) {
      alert('success');
    }
  }

  watch(() => props.event, getCourses);
</script>

<template>
  <Dialog v-model:visible="visible" modal :header="event?.name" :style="{ width: '50rem' }">
    <div class="flex flex-col gap-4">
      <span>Data: {{ event?.date }}</span>
      <CourseCard
        v-for="(course, index) in courses"
        :header="`Percurso ${index + 1}`"
        :show-subscribe-button="user?.role === 'ATHLETE'"
        v-bind="course"
        @subscribe="subscribe(course.id)"
      />
    </div>
  </Dialog>
</template>