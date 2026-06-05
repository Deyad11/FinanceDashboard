import { useState, useCallback } from 'react'

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setStoredValue(valueToStore)
    } catch (err) {
      console.error(`[useLocalStorage] Failed to persist key "${key}":`, err)
    }
  }, [key, storedValue])

  return [storedValue, setValue]
}

export default useLocalStorage