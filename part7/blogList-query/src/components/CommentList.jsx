import { useField } from '../hooks/useField'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'

import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'
import useBlogMutation from '../hooks/useBlogMutation'

const CommentList = ({ blog }) => {
  const { setNotification } = useContext(NotificationContext)
  const { addCommentMutation } = useBlogMutation()
  const commentInput = useField('text')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const comment = { content: commentInput.value }
      await addCommentMutation.mutateAsync({ blog, comment })
    } catch (error) {
      setNotification({ text: 'error add comment', type: 'danger' })
    } finally {
      commentInput.onReset()
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
