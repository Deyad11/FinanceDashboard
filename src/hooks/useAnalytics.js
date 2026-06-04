const useAnalytics = () => {
  const track = (eventName, params = {}) => {
    if (window.gtag) {
      window.gtag('event', eventName, params)
    }
    console.log(`[Analytics] ${eventName}`, params)
  }

  return { track }
}

export default useAnalytics