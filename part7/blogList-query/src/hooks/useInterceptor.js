import { useEffect } from 'react'
import axios from 'axios'

const useInterceptor = (errorInterceptor) => {
  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      errorInterceptor
    )
    return () => {
      axios.interceptors.response.eject(interceptorId)
    }
  }, [])
}

export default useInterceptor
