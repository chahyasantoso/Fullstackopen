import { useEffect, useRef } from 'react'
import CreateForm from './CreateForm'
import Toggleable from './Toggleable'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { useBlogs } from '../hooks/useBlogs'
import Shimmer, { ListShimmer } from './Shimmer'
import { useError } from '../hooks/useError'

const BlogList = () => {
  const { data: blogs, isSuccess, isError, error } = useBlogs()
  const createRef = useRef()
  const { handleError } = useError()

  return (
    <Shimmer
      as={<ListShimmer />}
      isSuccess={isSuccess}
      isError={isError}
      onError={() => handleError(error)}
      errorElement={<div>Error fetching blogs</div>}
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
          {blogs?.length === 0 && <div>No Data</div>}
          {blogs?.map((blog) => (
            <ListGroup.Item key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.user.name}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </Shimmer>
  )
}

export default BlogList
