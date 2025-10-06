<script setup lang="ts">
  import { ref } from 'vue';
  import Avatar from 'primevue/avatar';
  import InputText from 'primevue/inputtext';
  import Password from 'primevue/password';
  import Select from 'primevue/select';
  import Button from 'primevue/button';
  import { useRouter } from 'vue-router';
  import { registerOrganizer } from '../api/auth';

  const router = useRouter();

  const name = ref('');
  const email = ref('');
  const phone = ref('');
  const password = ref('');
  const role = ref<'ORGANIZER' | 'ATHLETE'>('ORGANIZER');
  const organization = ref('');

  const roles = ref([
    { name: 'Organizador', code: 'ORGANIZER' },
    { name: 'Atleta', code: 'ATHLETE' },
  ]);

  const logIn = async () => {
    const response = await registerOrganizer({
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      role: role.value,
      organization: role.value === 'ORGANIZER' ? organization.value : undefined,
    });

    if (!response.data) {
      return;
    }

    localStorage.setItem('jwt', response.data.token);

    router.push('/');
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <form class="flex flex-col items-center justify-center gap-4 w-1/2" onsubmit="return false;">
      <Avatar image="/user.jpg" shape="circle" class="!h-20 !w-20" />
      <label>Cadastrar-se</label>
      <div class="flex flex-col gap-1 w-full">
          <InputText v-model="name" placeholder="Nome" />
      </div>
      <div class="flex flex-col gap-1 w-full">
          <InputText v-model="email" placeholder="Email" />
      </div>
      <div class="flex flex-col gap-1 w-full">
          <InputText v-model="phone" placeholder="Telefone" />
      </div>
      <div class="flex flex-col gap-1 w-full">
          <Password v-model="password" placeholder="Senha" :feedback="false" fluid />
      </div>
      <div class="flex flex-col gap-1 w-full">
          <Select v-model="role" :options="roles" optionLabel="name" optionValue="code" placeholder="Papel" class="w-full" />
      </div>
      <div v-if="role === 'ORGANIZER'" class="flex flex-col gap-1 w-full">
          <InputText v-model="organization" placeholder="Organização" />
      </div>
      <Button type="submit" @click="logIn" class="w-full">Cadastrar</Button>
      <Button variant="link" @click="router.push('/login')">Entrar</Button>
    </form>
  </div>
</template>