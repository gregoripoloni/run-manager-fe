<script setup lang="ts">
  import { computed, useId } from 'vue';
  import InputText from 'primevue/inputtext';
  import Message from 'primevue/message';

  const props = withDefaults(defineProps<{
    id?: string;
    label?: string;
    type?: 'text' | 'number' | 'email' | 'password';
    invalid?: boolean;
    errorMessage?: string;
  }>(), {
    type: 'text',
  });

  const model = defineModel<string>();

  const getId = computed(() => props.id || useId());
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-id="label" :for="getId">{{ label }}</label>
    <slot>
      <InputText :id="getId" :type="type" v-model="model" :invalid="invalid" />
    </slot>
    <Message v-if="errorMessage" severity="error" size="small" variant="simple">
      {{ errorMessage }}
    </Message>
  </div>
</template>