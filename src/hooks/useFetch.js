import { useState, useEffect, useRef } from 'react'

const useFetch = (fetchFn, deps = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchFnRef = useRef(fetchFn)
  
  useEffect(() => { 
    fetchFnRef.current = fetchFn 
  })

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const load = async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(r => setTimeout(r, 800))
        }
        const result = await Promise.resolve(fetchFnRef.current())
        if (!cancelled) { 
          setData(result)
          setLoading(false) 
        }
      } catch (err) {
        if (!cancelled) { 
          setError(err.message ?? 'Unknown error')
          setLoading(false) 
        }
      }
    }
    
    load()
    
    return () => { cancelled = true }
  }, deps)

  return { data, loading, error }
}

export default useFetch