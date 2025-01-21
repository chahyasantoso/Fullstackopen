import { useDispatch, useSelector } from 'react-redux'
import CommentList from './CommentList'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { useBlog, useBlogDispatch } from '../hooks/useBlogs'
import { useAuth } from '../hooks/useAuth'

const Blog = () => {
  const userSession = useAuth()
  const params = useParams()
  const blog = useBlog(params.id)
  const { like, remove } = useBlogDispatch()

  const handleLike = async (blog) => {
    await like(blog)
  }

  const handleDelete = async (blog) => {
    const confirmOK = confirm(`Remove ${blog.title} ${blog.author}`)
    if (confirmOK) {
      await remove(blog)
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
