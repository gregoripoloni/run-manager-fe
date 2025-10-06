<script setup lang="ts">
  import { ref } from 'vue';
  import Avatar from 'primevue/avatar';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import Button from 'primevue/button';
  import { useRouter } from 'vue-router';
  import { loginOrganizer } from '../api/auth';

  const router = useRouter();

  const email = ref('');
  const password = ref('');

  const logIn = async () => {
    const response = await loginOrganizer({
      email: email.value,
      password: password.value,
    });

    if (!response.data) {
      return;
    }

    localStorage.setItem('jwt', response.data?.token);

    router.push('/');
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <form class="flex flex-col items-center justify-center gap-4 w-1/2" onsubmit="return false;">
      <Avatar image="/user.jpg" shape="circle" class="!h-20 !w-20" />
      <label>Iniciar sessão</label>
      <div class="flex flex-col gap-1 w-full">
          <InputText v-model="email" placeholder="Email" />
      </div>
      <div class="flex flex-col gap-1 w-full">
          <Password v-model="password" placeholder="Senha" :feedback="false" fluid />
      </div>
      <Button type="submit" @click="logIn" class="w-full">Entrar</Button>
      <Button variant="link" @click="router.push('/register')">Cadastrar-se</Button>
    </form>
  </div>
</template>