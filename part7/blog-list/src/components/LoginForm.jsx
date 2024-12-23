import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'
import useForm from '../hooks/useForm'

const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useForm()
  const password = useForm('password')

  const reset = () => {
    username.onReset()
    password.onReset()
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await dispatch(login(username.value, password.value))
    } catch (error) {
      dispatch(
        setNotification({ text: 'wrong username or password', type: 'error' })
      )
    } finally {
      reset()
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input data-testid="username" {...username} />
        </div>
        <div>
          Password
          <input data-testid="password" {...password} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
