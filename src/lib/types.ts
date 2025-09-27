export interface FormError {
  setError: (
    field: any,
    error: { type?: string; message: string },
    options?: { shouldFocus: boolean },
  ) => void;
  clearErrors: () => void;
}

export interface ErrorsData {
  errors: { path: string[]; message: string }[];
  error: string | null;
}
