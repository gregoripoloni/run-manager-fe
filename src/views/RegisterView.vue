<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Avatar from 'primevue/avatar';
  import Password from 'primevue/password';
  import Select from 'primevue/select';
  import Button from 'primevue/button';
  import FormField from '../components/FormField.vue';
  import { useFormFields } from '../composables/useFormFields';
  import { registerOrganizer } from '../api/auth';

  const router = useRouter();

  const { form, setFieldError, clearFieldError } = useFormFields({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'ORGANIZER' as 'ORGANIZER' | 'ATHLETE',
    organization: '',
  });

  const roles = ref([
    { name: 'Organizador', code: 'ORGANIZER' },
    { name: 'Atleta', code: 'ATHLETE' },
  ]);

  const logIn = async () => {
    const response = await registerOrganizer({
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
      phone: form.phone.value,
      role: form.role.value,
      organization: form.role.value === 'ORGANIZER' ? form.organization.value : undefined,
    });

    if (response.errors) {
      if (response.errors.name) {
        setFieldError('name', response.errors.name);
      } else {
        clearFieldError('name');
      }

      if (response.errors.email) {
        setFieldError('email', response.errors.email);
      } else {
        clearFieldError('email');
      }

      if (response.errors.password) {
        setFieldError('password', response.errors.password);
      } else {
        clearFieldError('password');
      }

      return;
    }

    localStorage.setItem('jwt', response.data?.token ?? '');

    router.push('/');
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <form class="flex flex-col items-center justify-center gap-4 w-1/2" onsubmit="return false;">
      <Avatar image="/user.jpg" shape="circle" class="!h-20 !w-20" />
      <label>Cadastrar-se</label>
      <FormField
        v-model="form.name.value"
        placeholder="Nome"
        :invalid="form.name.error"
        :errorMessage="form.name.errorMessage"
        class="w-full"
      />
      <FormField
        v-model="form.email.value"
        placeholder="Email"
        :invalid="form.email.error"
        :errorMessage="form.email.errorMessage"
        class="w-full"
      />
      <FormField
        v-model="form.phone.value"
        placeholder="Telefone"
        class="w-full"
      />
      <FormField :errorMessage="form.password.errorMessage" class="w-full">
        <Password
          v-model="form.password.value"
          placeholder="Senha"
          :feedback="false"
          :invalid="form.password.error"
          fluid
        />
      </FormField>
      <FormField class="w-full">
        <Select
          v-model="form.role.value"
          :options="roles"
          optionLabel="name"
          optionValue="code"
          placeholder="Papel"
          class="w-full"
        />
      </FormField>
      <FormField
        v-if="form.role.value === 'ORGANIZER'"
        v-model="form.organization.value"
        placeholder="Organização"
        class="w-full"
      />
      <Button type="submit" @click="logIn" class="w-full">Cadastrar</Button>
      <Button variant="link" @click="router.push('/login')">Entrar</Button>
    </form>
  </div>
</template>