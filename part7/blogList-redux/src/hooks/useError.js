import { useAuthDispatch } from './useAuth'
import { useNotificationDispatch } from './useNotification'

export const useError = () => {
  const { logout } = useAuthDispatch()
  const { setErrorNotificationTimeout } = useNotificationDispatch()

  const handleError = (error, text = 'Error happen') => {
    const errorText = error?.response?.data?.error ?? text
    setErrorNotificationTimeout(errorText)
    if (error) {
      console.error(error)
    }
  }

  const handleTokenError = (error) => {
    const errorText = error.response?.data?.error
    const tokenError = ['token expired', 'token invalid']
    if (tokenError.some((val) => errorText?.includes(val))) {
      logout()
    }
    return Promise.reject(error)
  }

  return {
    handleError,
    handleTokenError,
  }
}
