import axios from 'axios'
import { useEffect } from 'react'
import { useError } from './useError'

const useAxiosInterceptor = (axiosInstance = axios) => {
  const { handleTokenError } = useError()

  const setErrorInterceptor = (errorInterceptor) => {
    console.log('setting interceptor')
    return axiosInstance.interceptors.response.use(
      (response) => response,
      errorInterceptor
    )
  }

  const removeInterceptor = (interceptorId) => {
    axiosInstance.interceptors.response.eject(interceptorId)
  }

  useEffect(() => {
    const interceptorId = setErrorInterceptor(handleTokenError)
    return () => {
      removeInterceptor(interceptorId)
    }
  }, [])
}

export default useAxiosInterceptor
