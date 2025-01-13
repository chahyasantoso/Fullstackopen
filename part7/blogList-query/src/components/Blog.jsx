import CommentList from './CommentList'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import { useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useNotification from '../hooks/useNotification'
import useBlogsMutation from '../hooks/useBlogsMutation'
import { useBlog } from '../hooks/useBlogs'

const Blog = () => {
  const { userSession } = useAuth()
  const { id: blogId } = useParams()
  const { data: blog } = useBlog(blogId)
  const { likeMutation, deleteMutation } = useBlogsMutation()
  const { setNotificationTimeout } = useNotification()

  const handleLike = async (blog) => {
    try {
      await likeMutation.mutateAsync(blog)
    } catch (error) {
      handleError(error)
    }
  }

  const handleDelete = async (blog) => {
    const confirmOK = confirm(`Remove ${blog.title} ${blog.author}`)
    if (confirmOK) {
      try {
        await deleteMutation.mutateAsync(blog)
        setNotificationTimeout({
          text: 'blog deleted',
        })
      } catch (error) {
        handleError(error)
      }
    }
  }

  const handleError = (error) => {
    console.error(error)
    const text = error.response?.data?.error ?? error.message
    setNotificationTimeout({ text, type: 'danger' })
  }

  if (!blog) {
    return null
  }

  const btnDelete =
    userSession.id === blog.user.id ? (
      <Button
        className="mx-2"
        type="button"
        size="sm"
        onClick={() => handleDelete(blog)}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending && (
          <Spinner as="span" animation="border" size="sm" className="mx-2" />
        )}
        Remove Blog
      </Button>
    ) : null

  return (
    <Card className="mb-3">
      <Card.Header as="h3">
        {blog.title} by {blog.author}
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <a href={blog.url} className="url">
            {blog.url}
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          {blog.likes} likes
          <Button
            className="mx-1"
            type="button"
            size="sm"
            onClick={() => handleLike(blog)}
            disabled={likeMutation.isPending}
          >
            {likeMutation.isPending && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                className="mx-2"
              />
            )}
            Like
          </Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <span>added by {blog.user.name}</span>
          {btnDelete}
        </ListGroup.Item>
        <ListGroup.Item className="text-bg-light">
          <CommentList blog={blog} />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default Blog
