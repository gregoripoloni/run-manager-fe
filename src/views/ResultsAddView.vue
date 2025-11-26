<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Select from 'primevue/select';
  import Button from 'primevue/button';
  import { useToast } from 'primevue/usetoast';
  import MainPanel from '../components/MainPanel.vue';
  import FormField from '../components/FormField.vue';
  import { useFormFields } from '../composables/useFormFields';

  const toast = useToast();

  const router = useRouter();

  interface Event {
    id: number;
    nome: string;
  }

  interface Course {
    id: number;
    nome: string;
  }

  interface Athlete {
    id: number;
    nome: string;
  }

  const { form, resetForm, setFieldError, clearFieldError } = useFormFields({
    eventId: 0,
    courseId: 0,
    athleteId: 0,
    time: '',
  });

  const events = ref<Event[]>();
  const courses = ref<Course[]>();
  const athletes = ref<Athlete[]>();

  const cancel = () => {
    router.back();
  }

  onMounted(async () => {
    events.value = [
      { id: 1, nome: 'Evento 1' },
      { id: 2, nome: 'Evento 2' },
    ];
    courses.value = [
      { id: 1, nome: 'Percurso 1' },
      { id: 2, nome: 'Percurso 2' },
    ];
    athletes.value = [
      { id: 1, nome: 'Gregori' },
      { id: 2, nome: 'Paulo' },
      { id: 3, nome: 'Rodrigo' },
      { id: 4, nome: 'Vitor' },
      { id: 5, nome: 'Gabriel' }
    ];
  });
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
          option-label="nome"
          option-value="id"
        />
      </FormField>
      <FormField
        label="Percurso"
        :error-message="form.courseId.errorMessage"
      >
        <Select
          v-model="form.courseId.value"
          :options="courses"
          option-label="nome"
          option-value="id"
        />
      </FormField>
      <FormField
        label="Atleta"
        :error-message="form.athleteId.errorMessage"
      >
        <Select
          v-model="form.athleteId.value"
          :options="athletes"
          option-label="nome"
          option-value="id"
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
        <Button label="Salvar" icon="pi pi-check" />
      </div>
    </template>
  </MainPanel>
</template>