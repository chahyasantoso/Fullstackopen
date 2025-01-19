import { useField } from '../hooks/useField'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import useNotification from '../hooks/useNotification'
import useBlogsMutation from '../hooks/useBlogsMutation'
import { useError } from '../hooks/useError'

const CreateForm = ({ onCreate }) => {
  const { createMutation } = useBlogsMutation()
  const { setNotificationTimeout } = useNotification()

  const title = useField()
  const author = useField()
  const url = useField()

  const { handleError } = useError()
  const handleCreate = async (e) => {
    e.preventDefault()
    const blog = { title: title.value, author: author.value, url: url.value }
    try {
      const newBlog = await createMutation.mutateAsync(blog)
      setNotificationTimeout(`a new blog ${newBlog.title} by ${newBlog.author}`)
      onCreate?.()
      handleReset()
    } catch (error) {
      handleError(error)
    }
  }

  const handleReset = () => {
    title.onReset()
    author.onReset()
    url.onReset()
  }

  return (
    <Card className="mb-3">
      <Card.Header>Create New</Card.Header>
      <Card.Body>
        <Form onSubmit={handleCreate}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control name="title" {...title} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Author</Form.Label>
            <Form.Control name="author" {...author} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Url</Form.Label>
            <Form.Control name="url" {...url} />
          </Form.Group>
          <Button className="mt-3 w-100" variant="primary" type="submit">
            {createMutation.isPending && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                className="mx-2"
              />
            )}
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default CreateForm
