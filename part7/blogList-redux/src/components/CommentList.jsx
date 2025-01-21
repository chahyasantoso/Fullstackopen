import { useField } from '../hooks/useField'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import { useBlogDispatch } from '../hooks/useBlogs'
import { useError } from '../hooks/useError'

const CommentList = ({ blog }) => {
  const commentInput = useField('text')
  const { addComment } = useBlogDispatch()
  const { handleError } = useError()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const comment = { content: commentInput.value }
    try {
      await addComment(blog, comment)
      commentInput.onReset()
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div>
      <h5>comments</h5>
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <Form.Control name="comment" {...commentInput} />
          <Button type="submit">add comment</Button>
        </InputGroup>
      </Form>
      <Card>
        <ListGroup variant="flush">
          {blog.comments.map((comment) => (
            <ListGroup.Item key={comment.id}>{comment.content}</ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  )
}

export default CommentList
