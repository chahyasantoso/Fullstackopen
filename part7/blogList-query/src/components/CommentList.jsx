import { useField } from '../hooks/useField'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'

import useNotification from '../hooks/useNotification'
import useBlogsMutation from '../hooks/useBlogsMutation'

const CommentList = ({ blog }) => {
  const { setNotificationTimeout } = useNotification()
  const { addCommentMutation } = useBlogsMutation()
  const commentInput = useField('text')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const comment = { content: commentInput.value }
      await addCommentMutation.mutateAsync({ blog, comment })
      handleReset()
    } catch (error) {
      handleError(error)
    }
  }

  const handleReset = () => {
    commentInput.onReset()
  }

  const handleError = (error) => {
    console.error(error)
    const text = error.response?.data?.error ?? error.message
    setNotificationTimeout({ text, type: 'danger' })
  }

  return (
    <div>
      <h5>comments</h5>
      <Form onSubmit={handleSubmit} onReset={() => console.log('reset')}>
        <InputGroup className="mb-3">
          <Form.Control name="comment" {...commentInput} />
          <Button
            type="submit"
            disabled={addCommentMutation.isPending || !commentInput.value}
          >
            {addCommentMutation.isPending && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                className="mx-2"
              />
            )}
            add comment
          </Button>
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
