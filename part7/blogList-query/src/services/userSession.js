const STORAGE_USER_KEY = 'user_session'

const getSession = () => {
  //throw new Error("can't get session")
  return JSON.parse(localStorage.getItem(STORAGE_USER_KEY))
}

const setSession = (userSession) => {
  //throw new Error("can't set session")
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userSession))
}

const clearSession = () => {
  //throw new Error("can't clear session")
  localStorage.removeItem(STORAGE_USER_KEY)
}

export default { getSession, setSession, clearSession }
