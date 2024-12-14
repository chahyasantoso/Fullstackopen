import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleUsernameChange = e => setUsername(e.target.value)
  const handlePasswordChange = e => setPassword(e.target.value)
  const resetLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const login = async e => {
    e.preventDefault()
    await onSubmit(username, password)
    resetLoginForm()
  }

  return (
    <>
      <form onSubmit={login}>
        <div>
          Username <input data-testid='username' type='text' value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          Password <input data-testid='password' type='text' value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm