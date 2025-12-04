<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import Select from 'primevue/select';
  import Button from 'primevue/button';
  import { useToast } from 'primevue/usetoast';
  import MainPanel from '../components/MainPanel.vue';
  import FormField from '../components/FormField.vue';
  import { useFormFields } from '../composables/useFormFields';
  import { getEventsByOrganizer } from '../api/events';
  import { getCoursesByEvent } from '../api/courses';
  import { getAthletesByCourse } from '../api/athletes';
  import { saveResult } from '../api/results';

  const toast = useToast();

  const router = useRouter();

  const { form, resetForm, setFieldError, clearFieldError } = useFormFields({
    eventId: 0,
    courseId: 0,
    athleteId: 0,
    time: '',
  });

  const events = ref();
  const courses = ref();
  const athletes = ref();

  const cancel = () => {
    router.back();
  }

  onMounted(async () => {
    const response = await getEventsByOrganizer();
    if (response.data) {
      events.value = response.data;
    }
  });

  watch(form.eventId, async () => {
    form.courseId.value = 0;
    form.athleteId.value = 0;
    courses.value = [];
    athletes.value = [];
    const response = await getCoursesByEvent(form.eventId.value);
    if (response.data) {
      courses.value = response.data;
    }
  });

  watch(form.courseId, async () => {
    form.athleteId.value = 0;
    athletes.value = [];
    const response = await getAthletesByCourse(form.courseId.value);
    if (response.data) {
      athletes.value = response.data;
    }
  });

  const save = async () => {
    const response = await saveResult(form.courseId.value, {
      registrationId: form.athleteId.value,
      time: form.time.value,
    });

    if (response.errors) {
      // if (response.errors.name) {
      //   setFieldError('name', response.errors.name);
      // } else {
      //   clearFieldError('name');
      // }

      // if (response.errors.error) {
      //   toast.add({ severity: 'error', summary: 'Erro ao cadastrar grupo', detail: response.errors.error, life: 3000 });
      // }

      return;
    }

    toast.add({ severity: 'success', summary: 'Grupo cadastrado', detail: 'O grupo foi cadastrado com sucesso!', life: 3000 });
    resetForm();
  };
</script>

<template>
  <MainPanel title="Cadastrar resultados">
    <div class="grid grid-cols-2 gap-4">
      <FormField
        label="Evento"
        :error-message="form.eventId.errorMessage"
      >
        <Select
          v-model="form.eventId.value"
          :options="events"
          :invalid="form.eventId.error"
          option-label="name"
          option-value="id"
          empty-message="Nenhuma opção encontrada"
        />
      </FormField>
      <FormField
        label="Percurso"
        :error-message="form.courseId.errorMessage"
      >
        <Select
          v-model="form.courseId.value"
          :options="courses"
          :option-label="(course) => `${course.location} - ${course.distanceKm} km - ${course.startTime} - ${course.category}`"
          option-value="id"
          empty-message="Nenhuma opção encontrada"
        />
      </FormField>
      <FormField
        label="Atleta"
        :error-message="form.athleteId.errorMessage"
      >
        <Select
          v-model="form.athleteId.value"
          :options="athletes"
          option-label="athleteName"
          option-value="registrationId"
          empty-message="Nenhuma opção encontrada"
        />
      </FormField>
      <FormField
        label="Tempo de prova"
        v-model="form.time.value"
        :invalid="form.time.error"
        :error-message="form.time.errorMessage"
        placeholder="HH:MM:SS"
      />
    </div>
    <template #footer>
      <div class="flex gap-4 w-full justify-end">
        <Button label="Cancelar" severity="secondary" @click="cancel" />
        <Button label="Salvar" icon="pi pi-check" @click="save" />
      </div>
    </template>
  </MainPanel>
</template>