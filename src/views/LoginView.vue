<script setup lang="ts">
  import { inject } from 'vue';
  import { useRouter } from 'vue-router';
  import Avatar from 'primevue/avatar';
  import Password from 'primevue/password';
  import Button from 'primevue/button';
  import FormField from '../components/FormField.vue';
  import { useFormFields } from '../composables/useFormFields';
  import { loginOrganizer } from '../api/auth';
  import { userKey } from '../context/user';

  const router = useRouter();

  const userContext = inject(userKey);

  if (!userContext) {
    throw new Error('User context not provided!');
  }

  const { updateUser } = userContext;

  const { form, setFieldError, clearFieldError } = useFormFields({
    email: '',
    password: '',
  });

  const logIn = async () => {
    const response = await loginOrganizer({
      email: form.email.value,
      password: form.password.value,
    });

    if (response.errors) {
      if (response.errors.email) {
        setFieldError('email', response.errors.email)
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

    if (response.data) {
      const user = {
        userId: response.data.userId,
        name: response.data.name,
        email: response.data.email,
        role: response.data.role,
      };

      updateUser(user);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('jwt', response.data.token);

      router.push('/');
    }
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <form class="flex flex-col items-center justify-center gap-4 w-1/2" onsubmit="return false;">
      <Avatar image="/user.jpg" shape="circle" class="!h-20 !w-20" />
      <label>Iniciar sessão</label>
      <FormField
        v-model="form.email.value"
        placeholder="Email"
        :invalid="form.email.error"
        :error-message="form.email.errorMessage"
        class="w-full"
      />
      <FormField :error-message="form.password.errorMessage" class="w-full">
        <Password
          v-model="form.password.value"
          placeholder="Senha"
          :feedback="false"
          :invalid="form.password.error"
          fluid
        />
      </FormField>
      <Button type="submit" @click="logIn" class="w-full">Entrar</Button>
      <Button variant="link" @click="router.push('/register')">Cadastrar-se</Button>
    </form>
  </div>
</template>