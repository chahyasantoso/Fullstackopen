import { useDispatch, useSelector } from 'react-redux'
import CommentList from './CommentList'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import useBlogMutation from '../hooks/useBlogMutation'

const Blog = () => {
  const params = useParams()
  const userSession = useSelector((state) => state.userSession)

  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  const blog = blogs ? blogs.find((blog) => blog.id === params.id) : null

  const { likeMutation, deleteMutation } = useBlogMutation()

  const handleLike = async (blog) => {
    likeMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = async (blog) => {
    const confirmOK = confirm(`Remove ${blog.title} ${blog.author}`)
    if (confirmOK) {
      deleteMutation.mutate(blog)
    }
  }

  if (!blog) {
    return null
  }

  const btnRemove =
    userSession.id === blog.user.id ? (
      <Button
        className="mx-2"
        type="button"
        size="sm"
        onClick={() => handleDelete(blog)}
      >
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
          >
            Like
          </Button>
        </ListGroup.Item>
        <ListGroup.Item>
          <span>added by {blog.user.name}</span>
          {btnRemove}
        </ListGroup.Item>
        <ListGroup.Item className="text-bg-light">
          <CommentList blog={blog} />
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

export default Blog
