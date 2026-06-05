import { useCallback } from 'react'

const useAnalytics = () => {
  const track = useCallback((eventName, params = {}) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params)
    }
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] ${eventName}`, params)
    }
  }, []) 

  return { track }
}

export default useAnalytics