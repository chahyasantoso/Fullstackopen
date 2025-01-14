import { useRef } from 'react'
import CreateForm from './CreateForm'
import Toggleable from './Toggleable'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useBlogs } from '../hooks/useBlogs'
import BlogPlaceholder, { ListPlaceholder } from './BlogPlaceholder'

const BlogList = () => {
  const { data: blogs, isSuccess, isError } = useBlogs()
  const createRef = useRef()

  return (
    <BlogPlaceholder
      placeholder={<ListPlaceholder />}
      isSuccess={isSuccess}
      isError={isError}
    >
      <Toggleable
        className="mb-3 "
        ref={createRef}
        showLabel="New Blog"
        hideLabel="Cancel"
      >
        <CreateForm onCreate={() => createRef.current.toggle()} />
      </Toggleable>
      <Card>
        <ListGroup variant="flush">
          {blogs?.map((blog) => (
            <ListGroup.Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.user.name}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </BlogPlaceholder>
  )
}

export default BlogList
