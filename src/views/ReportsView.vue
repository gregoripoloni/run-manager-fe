<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import Select from 'primevue/select';
  import Panel from 'primevue/panel';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import MainPanel from '../components/MainPanel.vue';
  import FormField from '../components/FormField.vue';
  import { useFormFields } from '../composables/useFormFields';
  import { getEventsByOrganizer } from '../api/events';
  import { getRankingReport, getRegistrationReport } from '../api/reports';

  const { form } = useFormFields({
    eventId: 0,
    reportId: 0,
    courseId: 0,
  });

  const reports = ref([
    {
      id: 1,
      name: 'Inscritos',
    },
    {
      id: 2,
      name: 'Ranking',
    },
  ]);

  const events = ref();
  const courses = ref();
  const report = ref();

  const getReport = async () => {
    courses.value = [];
    report.value = [];

    form.courseId.value = 0;

    if (!form.eventId.value || !form.reportId.value) {
      return;
    }

    let getReport;

    if (form.reportId.value === 1) {
      getReport = getRegistrationReport;
    } else {
      getReport = getRankingReport;
    }

    const response = await getReport(form.eventId.value);
    if (response.data) {
      courses.value = response.data;
      console.log(response.data);
    }
  }

  onMounted(async () => {
    const response = await getEventsByOrganizer();
    if (response.data) {
      events.value = response.data;
    }
  });

  watch(form.eventId, getReport);
  watch(form.reportId, getReport);

  watch(form.courseId, async () => {
    const course = courses.value.find((course: { courseId: number; }) => course.courseId === form.courseId.value);

    if (form.reportId.value === 1) {
      report.value = course.atletas;
    } else {
      report.value = course.ranking;
    }
  });
</script>

<template>
  <MainPanel title="Gerar relatórios">
    <div class="flex flex-col gap-4">
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
          label="Relatório"
          :error-message="form.reportId.errorMessage"
        >
          <Select
            v-model="form.reportId.value"
            :options="reports"
            :invalid="form.reportId.error"
            option-label="name"
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
            :invalid="form.courseId.error"
            :option-label="(course) => `${course.courseLocation} - ${course.courseCategory}`"
            option-value="courseId"
            empty-message="Nenhuma opção encontrada"
          />
        </FormField>
      </div>
      <Panel class="table-panel">
        <DataTable v-if="form.reportId.value === 1" :value="report" striped-rows>
          <Column field="name" header="Nome"></Column>
          <Column field="email" header="Email"></Column>
        </DataTable>
        <DataTable v-else :value="report" striped-rows>
          <Column field="athleteName" header="Nome"></Column>
          <Column field="elapsedSeconds" header="Tempo de prova"></Column>
        </DataTable>
      </Panel>
    </div>
  </MainPanel>
</template>

<style scoped>
  .table-panel > :deep(.p-panel-header) {
    padding-bottom: 0;
  }
</style>