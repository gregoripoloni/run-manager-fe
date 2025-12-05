<script setup lang="ts">
  import { onMounted, ref, inject } from 'vue';
  import { useRouter } from 'vue-router';
  import MultiSelect from 'primevue/multiselect';
  import Button from 'primevue/button';
  import { useToast } from 'primevue/usetoast';
  import MainPanel from '../components/MainPanel.vue';
  import FormField from '../components/FormField.vue';
  import { useFormFields } from '../composables/useFormFields';
  import { getAthletes } from '../api/athletes';
  import { saveTeam } from '../api/teams';
  import { userKey } from '../context/user';

  const userContext = inject(userKey);

  if (!userContext) {
    throw new Error('User context not provided!');
  }

  const { user } = userContext;

  const toast = useToast();

  const router = useRouter();

  const { form, resetForm, setFieldError, clearFieldError } = useFormFields({
    name: '',
    athletes: [] as number[],
  });

  const athletes = ref();

  const save = async () => {
    const response = await saveTeam({
      name: form.name.value,
      responsibleId: user.value?.userId as number,
      memberIds: form.athletes.value,
    });

    if (response.errors) {
      if (response.errors.name) {
        setFieldError('name', response.errors.name);
      } else {
        clearFieldError('name');
      }

      if (response.errors.error) {
        toast.add({ severity: 'error', summary: 'Erro ao cadastrar grupo', detail: response.errors.error, life: 3000 });
      }

      return;
    }

    toast.add({ severity: 'success', summary: 'Grupo cadastrado', detail: 'O grupo foi cadastrado com sucesso!', life: 3000 });
    resetForm();
  }

  const cancel = () => {
    router.back();
  }

  onMounted(async () => {
    const response = await getAthletes();

    if (response.data) {
      athletes.value = response.data.filter((athlete) => athlete.id !== user.value?.userId);
    }
  });
</script>

<template>
  <MainPanel title="Cadastrar grupos">
    <div class="grid grid-cols-2 gap-4">
      <FormField
        label="Nome do grupo"
        v-model="form.name.value"
        :invalid="form.name.error"
        :error-message="form.name.errorMessage"
      />
      <FormField
        label="Atletas"
        :error-message="form.athletes.errorMessage"
      >
        <MultiSelect
          v-model="form.athletes.value"
          :options="athletes"
          filter
          display="chip"
          option-label="name"
          option-value="id"
        />
      </FormField>
    </div>
    <template #footer>
      <div class="flex gap-4 w-full justify-end">
        <Button label="Cancelar" severity="secondary" @click="cancel" />
        <Button label="Salvar" icon="pi pi-check" @click="save" />
      </div>
    </template>
  </MainPanel>
</template>