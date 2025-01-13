import axios from 'axios'
import { useEffect } from 'react'
import useNotification from './useNotification'
import useAuth from './useAuth'

const useAxiosInterceptor = (axiosInstance = axios) => {
  const { logout } = useAuth()
  const { setNotificationTimeout } = useNotification()

  const handleExpireToken = (error) => {
    const text = error.response?.data?.error ?? error.message
    const tokenError = ['token expired', 'invalid token']
    if (tokenError.some((error) => text.includes(error))) {
      setNotificationTimeout({ text, type: 'danger' })
      logout()
    }
    return Promise.reject(error)
  }

  const setErrorInterceptor = (errorInterceptor) => {
    return axiosInstance.interceptors.response.use(
      (response) => response,
      errorInterceptor
    )
  }

  const removeInterceptor = (interceptorId) => {
    axiosInstance.interceptors.response.eject(interceptorId)
  }

  useEffect(() => {
    const interceptorId = setErrorInterceptor(handleExpireToken)
    return () => {
      removeInterceptor(interceptorId)
    }
  }, [])
}

export default useAxiosInterceptor
