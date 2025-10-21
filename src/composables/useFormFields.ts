import { reactive } from 'vue';

export interface FormField<T = string> {
  value: T;
  error: boolean;
  errorMessage: string;
}

export function useFormFields<T extends Record<string, any>>(initialValues: T) {
  const form = reactive(
    Object.fromEntries(
      Object.entries(initialValues).map(([key, initialValue]) => [
        key,
        {
          value: initialValue,
          error: false,
          errorMessage: '',
        } as FormField<typeof initialValue>,
      ])
    )
  ) as { [K in keyof T]: FormField<T[K]> };

  const resetForm = () => {
    (Object.entries(initialValues) as [keyof T, any][]).forEach(([key, initialValue]) => {
      form[key].value = initialValue
      form[key].error = false
      form[key].errorMessage = ''
    });
  }

  return { form, resetForm };
}
