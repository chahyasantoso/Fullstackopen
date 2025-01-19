import useAuth from './useAuth'
import useNotification from './useNotification'

export const useError = () => {
  const { logout } = useAuth()
  const { setErrorNotificationTimeout } = useNotification()

  const handleError = (error, defaultErrorText = 'Error happen') => {
    const errorText = error?.response?.data?.error ?? defaultErrorText
    setErrorNotificationTimeout(errorText)
    if (error) {
      console.error(error)
    }
  }

  const handleTokenError = (error) => {
    const errorText = error.response?.data?.error
    const tokenError = ['token expired', 'token invalid']
    if (tokenError.some((val) => errorText?.includes(val))) {
      const handleLogout = async () => {
        try {
          await logout()
        } catch (error) {
          handleError(
            error,
            "can't logout, clear your browser storage to logout"
          )
        }
      }
      handleLogout()
    }
    return Promise.reject(error)
  }

  return {
    handleError,
    handleTokenError,
  }
}
