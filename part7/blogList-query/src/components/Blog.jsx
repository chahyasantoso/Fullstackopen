import CommentList from './CommentList'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useNotification from '../hooks/useNotification'
import useBlogsMutation from '../hooks/useBlogsMutation'
import { useBlog } from '../hooks/useBlogs'
import { useError } from '../hooks/useError'
import Shimmer from './Shimmer'

const Blog = () => {
  const { userSession } = useAuth()
  const { id: blogId } = useParams()
  const { data: blog, isSuccess, isError, error } = useBlog(blogId)
  const { likeMutation, deleteMutation } = useBlogsMutation()
  const { setNotificationTimeout } = useNotification()
  const { handleError } = useError()
  const navigate = useNavigate()

  const handleLike = async (blog) => {
    try {
      await likeMutation.mutateAsync(blog)
    } catch (error) {
      handleError(error)
    }
  }

  const handleDelete = async (blog) => {
    const confirmOK = confirm(`Delete ${blog.title} ${blog.author}`)
    if (confirmOK) {
      try {
        await deleteMutation.mutateAsync(blog)
        setNotificationTimeout(`delete blog ${blog.title} success`)
      } catch (error) {
        handleError(error)
      }
    }
  }

  const isOwner = userSession?.id === blog?.user.id
  const btnDelete = isOwner && (
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
  )

  const isBlogNotFound = isSuccess && !blog
  const handleBlogNotFound = () => {
    if (!deleteMutation.isSuccess) {
      handleError(error, 'Blog not found')
    }
    navigate('/', { replace: true })
  }

  return (
    <Shimmer
      isSuccess={isSuccess}
      isError={isError || isBlogNotFound}
      onError={handleBlogNotFound}
    >
      <Card className="mb-3">
        <Card.Header as="h3">
          {blog?.title} by {blog?.author}
        </Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <a href={blog?.url} className="url">
              {blog?.url}
            </a>
          </ListGroup.Item>
          <ListGroup.Item>
            {blog?.likes} likes
            <Button
              className="mx-1"
              type="button"
              size="sm"
              onClick={() => handleLike(blog)}
              disabled={likeMutation.isPending}
            >
              Like
              {likeMutation.isPending && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  className="mx-2"
                />
              )}
            </Button>
          </ListGroup.Item>
          <ListGroup.Item>
            <span>added by {blog?.user.name}</span>
            {btnDelete}
          </ListGroup.Item>
          <ListGroup.Item className="text-bg-light">
            <CommentList blog={blog} />
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Shimmer>
  )
}

export default Blog
