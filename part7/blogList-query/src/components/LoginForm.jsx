import { useField } from '../hooks/useField'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import UserSessionContext from '../contexts/UserSessionContext'
import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const LoginForm = () => {
  const { login } = useContext(UserSessionContext)
  const { setNotification } = useContext(NotificationContext)
  const username = useField()
  const password = useField('password')

  const reset = () => {
    username.onReset()
    password.onReset()
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(username.value, password.value)
    } catch (error) {
      setNotification({ text: 'wrong username or password', type: 'danger' })
    } finally {
      reset()
    }
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" {...username} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" {...password} />
          </Form.Group>
          <Button className="mt-3 w-100" variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default LoginForm
