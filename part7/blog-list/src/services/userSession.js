const STORAGE_USER_KEY = 'user'

const getSession = () => {
  return JSON.parse(localStorage.getItem(STORAGE_USER_KEY))
}

const setSession = (userSession) => {
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userSession))
}

const clearSession = () => {
  localStorage.clear()
}

export default { getSession, setSession, clearSession }
