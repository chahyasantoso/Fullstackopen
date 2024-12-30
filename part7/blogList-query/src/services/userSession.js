const STORAGE_USER_KEY = 'user_session'

const getSession = () => {
  return JSON.parse(localStorage.getItem(STORAGE_USER_KEY))
}

const setSession = (userSession) => {
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userSession))
}

const clearSession = () => {
  localStorage.removeItem(STORAGE_USER_KEY)
}

export default { getSession, setSession, clearSession }
