<script setup lang="ts">
  import Menubar from 'primevue/menubar'
  import Avatar from 'primevue/avatar'
  import Image from 'primevue/image'
</script>

<template>
  <Menubar class="fixed w-full h-15 z-1 !px-10 !rounded-none !border-none !bg-linear-to-r from-primary-500 to-violet-500">
    <template #start>
      <Image src="/logo-192.png" image-class="h-10 w-auto rounded-lg" />
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <Avatar image="/user.jpg" shape="circle" />
      </div>
    </template>
  </Menubar>
</template>