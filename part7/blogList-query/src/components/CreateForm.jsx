import { useField } from '../hooks/useField'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import useNotification from '../hooks/useNotification'
import useBlogs from '../hooks/useBlogs'

const CreateForm = ({ onCreate }) => {
  const title = useField()
  const author = useField()
  const url = useField()

  const reset = () => {
    title.onReset()
    author.onReset()
    url.onReset()
  }

  const { createBlog } = useBlogs()
  const { setNotificationTimeout } = useNotification()

  const handleCreate = async (e) => {
    e.preventDefault()
    const blog = { title: title.value, author: author.value, url: url.value }
    // try {
    await createBlog(blog)
    onCreate?.()
    reset()
    // } catch (error) {
    //   const text = error.response?.data?.error ?? error.message
    //   setNotificationTimeout({ text, type: 'danger' })
    // }
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
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default CreateForm
