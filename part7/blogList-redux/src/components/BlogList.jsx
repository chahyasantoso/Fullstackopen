import { useEffect, useRef } from 'react'
import CreateForm from './CreateForm'
import Toggleable from './Toggleable'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useBlogs } from '../hooks/useBlogs'

const BlogList = () => {
  const blogs = useBlogs()
  const createRef = useRef()

  return (
    <div>
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
          {blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.user.name}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  )
}

export default BlogList
