import { useField } from '../hooks/useField'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import useAuth from '../hooks/useAuth'
import useNotification from '../hooks/useNotification'

const LoginForm = () => {
  const { login, isLoading } = useAuth()
  const { setNotificationTimeout } = useNotification()
  const username = useField()
  const password = useField('password')

  const handleLogin = async (e) => {
    e.preventDefault()
    const form = e.target
    try {
      await login(username.value, password.value)
    } catch (error) {
      handleError(error)
    } finally {
      handleReset()
    }
  }

  const handleReset = () => {
    username.onReset()
    password.onReset()
  }

  const handleError = (error) => {
    console.error(error)
    const text = error.response?.data?.error ?? error.message
    setNotificationTimeout({ text, type: 'danger' })
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
          <Button
            className="mt-3 w-100"
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                className="mx-2"
              />
            )}
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default LoginForm
