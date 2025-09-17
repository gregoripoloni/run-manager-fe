<script setup lang="ts">
  import Menubar from 'primevue/menubar'
  import InputText from 'primevue/inputtext'
  import Avatar from 'primevue/avatar'
</script>

<template>
  <Menubar class="fixed w-full h-15 z-1 !border-none !rounded-none !bg-linear-to-r from-primary-500 to-violet-500">
    <template #end>
      <div class="flex items-center gap-2">
        <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
        <Avatar image="/amyelsner.png" shape="circle" />
      </div>
    </template>
  </Menubar>
</template>