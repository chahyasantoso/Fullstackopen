import { useField } from '../hooks/useField'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useAuthDispatch } from '../hooks/useAuth'
import { useError } from '../hooks/useError'

const LoginForm = () => {
  const username = useField()
  const password = useField('password')
  const { login } = useAuthDispatch()
  const { handleError } = useError()

  const reset = () => {
    username.onReset()
    password.onReset()
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(username.value, password.value)
      reset()
    } catch (error) {
      handleError(error)
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
