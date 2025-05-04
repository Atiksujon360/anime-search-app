import { useEffect, useState } from 'react';

/**
 * Custom hook to debounce a value. Delays updating the value until after a specified delay.
 * @param value - The value to debounce (e.g., a search query).
 * @param delay - The delay in milliseconds before updating the debounced value.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T { 
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => { 
    const handler = setTimeout(() => setDebouncedValue(value), delay); 
    return () => clearTimeout(handler);
  }, [value, delay]);  
  return debouncedValue;
}