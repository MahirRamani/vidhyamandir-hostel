import { useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { StudentFormData } from '@/types/student-form';

const STORAGE_KEY = 'multistep-form-data';
const PROGRESS_KEY = 'multistep-form-progress';

export const useFormPersistence = () => {
  // Debounced save to localStorage
  const debouncedSave = useCallback(
    debounce((data: Partial<StudentFormData>) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save form data:', error);
      }
    }, 500),
    []
  );

  const saveFormData = useCallback((data: Partial<StudentFormData>) => {
    debouncedSave(data);
  }, [debouncedSave]);

  const loadFormData = useCallback((): Partial<StudentFormData> => {
    try {
      console.log('Loading form data...');
      const saved = localStorage.getItem(STORAGE_KEY);

      console.log('Saved data:', saved);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Failed to load form data:', error);
      return {};
    }
  }, []);

  const saveProgress = useCallback((currentStep: number, completedSteps: number[]) => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify({
        currentStep,
        completedSteps,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, []);

  const loadProgress = useCallback(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      return saved ? JSON.parse(saved) : { currentStep: 0, completedSteps: [] };
    } catch (error) {
      console.error('Failed to load progress:', error);
      return { currentStep: 0, completedSteps: [] };
    }
  }, []);

  const clearStorage = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(PROGRESS_KEY);
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }, []);

  return {
    saveFormData,
    loadFormData,
    saveProgress,
    loadProgress,
    clearStorage
  };
};