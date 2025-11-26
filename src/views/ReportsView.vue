<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Select from 'primevue/select';
  import Tabs from 'primevue/tabs';
  import TabList from 'primevue/tablist';
  import Tab from 'primevue/tab';
  import TabPanels from 'primevue/tabpanels';
  import TabPanel from 'primevue/tabpanel';
  import Panel from 'primevue/panel';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import MainPanel from '../components/MainPanel.vue';
  import FormField from '../components/FormField.vue';
  import { useFormFields } from '../composables/useFormFields';

  interface Event {
    id: number;
    nome: string;
  }

  interface Course {
    id: number;
    nome: string;
  }

  interface Athletes {
    id: number;
    nome: string;
    time: string;
  }

  const { form } = useFormFields({
    eventId: 0,
    courseId: 0,
  });

  const events = ref<Event[]>();
  const courses = ref<Course[]>();
  const athletes = ref<Athletes[]>();

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
      { id: 1, nome: 'Gregori', time: '00:50:43' },
      { id: 2, nome: 'Paulo', time: '00:53:10' },
      { id: 3, nome: 'Rodrigo', time: '01:00:26' },
      { id: 4, nome: 'Vitor', time: '01:20:05' },
      { id: 5, nome: 'Gabriel', time: '01:35:00' },
    ];
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
      </div>
      <Tabs value="0">
        <TabList>
          <Tab value="0">Inscritos</Tab>
          <Tab value="1">Ranking</Tab>
        </TabList>
        <TabPanels class="!px-0 !py-4">
          <TabPanel value="0">
            <Panel class="table-panel">
              <DataTable :value="athletes" striped-rows>
                <Column field="nome" header="Nome"></Column>
              </DataTable>
            </Panel>
          </TabPanel>
          <TabPanel value="1">
            <Panel class="table-panel">
              <DataTable :value="athletes" striped-rows>
                <Column field="nome" header="Nome"></Column>
                <Column field="time" header="Tempo" sortable></Column>
              </DataTable>
            </Panel>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </MainPanel>
</template>

<style scoped>
  .table-panel > :deep(.p-panel-header) {
    padding-bottom: 0;
  }
</style>