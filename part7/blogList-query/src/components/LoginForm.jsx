import { useField } from '../hooks/useField'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import { useAuthDispatch } from '../hooks/useAuth'
import { useError } from '../hooks/useError'

const LoginForm = () => {
  const { login, isPending } = useAuthDispatch()
  const username = useField()
  const password = useField('password')

  const { handleError } = useError()
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(username.value, password.value)
    } catch (error) {
      handleError(error, "can't save login")
    } finally {
      handleReset()
    }
  }

  const handleReset = () => {
    username.onReset()
    password.onReset()
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
            disabled={isPending}
          >
            {isPending && (
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
