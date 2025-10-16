<script setup lang="ts">
  import { reactive } from 'vue';
  import Avatar from 'primevue/avatar';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import Message from 'primevue/message';
  import Button from 'primevue/button';
  import { useRouter } from 'vue-router';
  import { loginOrganizer } from '../api/auth';

  const router = useRouter();

  const form = reactive({
    email: {
      value: '',
      error: false,
      errorMessage: '',
    },
    password: {
      value: '',
      error: false,
      errorMessage: '',
    },
  });

  const logIn = async () => {
    const response = await loginOrganizer({
      email: form.email.value,
      password: form.password.value,
    });

    if (response.errors) {
      if (response.errors.email) {
        form.email.error = true;
        form.email.errorMessage = response.errors.email;
      } else {
        form.email.error = false;
        form.email.errorMessage = '';
      }

      if (response.errors.password) {
        form.password.error = true;
        form.password.errorMessage = response.errors.password;
      } else {
        form.password.error = false;
        form.password.errorMessage = '';
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
      <label>Iniciar sessão</label>
      <div class="flex flex-col gap-1 w-full">
          <InputText v-model="form.email.value" placeholder="Email" :invalid="form.email.error" />
          <Message v-if="form.email.error" severity="error" size="small" variant="simple">
            {{ form.email.errorMessage }}
          </Message>
      </div>
      <div class="flex flex-col gap-1 w-full">
          <Password v-model="form.password.value" placeholder="Senha" :feedback="false" :invalid="form.password.error" fluid />
          <Message v-if="form.password.error" severity="error" size="small" variant="simple">
            {{ form.password.errorMessage }}
          </Message>
      </div>
      <Button type="submit" @click="logIn" class="w-full">Entrar</Button>
      <Button variant="link" @click="router.push('/register')">Cadastrar-se</Button>
    </form>
  </div>
</template>