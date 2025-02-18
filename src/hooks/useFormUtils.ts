// src/hooks/useFormUtils.ts
import { useState } from 'react';

export const useFormUtils = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitWithLoading = async <T>(
    submitFn: () => Promise<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: any) => void
  ) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const result = await submitFn();
      onSuccess?.(result);
    } catch (error) {
      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmitWithLoading,
  };
};