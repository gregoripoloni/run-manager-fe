<script setup lang="ts">
  import { computed, useId } from 'vue';
  import InputText from 'primevue/inputtext';
  import Message from 'primevue/message';

  const props = withDefaults(defineProps<{
    id?: string;
    label?: string;
    type?: 'text' | 'number' | 'email' | 'password';
    placeholder?: string;
    invalid?: boolean;
    errorMessage?: string;
  }>(), {
    type: 'text',
  });

  const model = defineModel<string>();

  const id = computed(() => props.id || useId());
</script>

<template>
  <div class="flex flex-col gap-2">
    <label v-if="label" :for="id">{{ label }}</label>
    <slot>
      <InputText v-model="model" :id="id" :type="type" :placeholder="placeholder" :invalid="invalid" />
    </slot>
    <Message v-if="errorMessage" severity="error" size="small" variant="simple">
      {{ errorMessage }}
    </Message>
  </div>
</template>