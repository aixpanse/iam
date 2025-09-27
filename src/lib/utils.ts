import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FormError, ErrorsData } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function applyFormErrors(form: FormError, data: ErrorsData): void {
  // apply error to individual fields
  for (const error of data.errors) {
    for (const field of error.path) {
      form.setError(field, { message: error.message }, { shouldFocus: true });
    }
  }

  // applay general form error
  if (data.error) {
    form.setError('formError', { type: 'manual', message: data.error });
  } else {
    form.clearErrors();
  }
}

export function hasFormErrors(data: ErrorsData): boolean {
  const hasGeneralFormError = !!data.error;
  const hasFormFieldsErrors = data.errors?.[0]?.path?.length > 0;
  return hasGeneralFormError || hasFormFieldsErrors;
}
