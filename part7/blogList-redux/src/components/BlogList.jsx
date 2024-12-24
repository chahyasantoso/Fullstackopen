import { useEffect, useRef } from 'react'
import CreateForm from './CreateForm'
import Toggleable from './Toggleable'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const createRef = useRef()

  return (
    <div>
      <Toggleable ref={createRef} showLabel="New Blog" hideLabel="Cancel">
        <CreateForm onCreate={() => createRef.current.toggle()} />
      </Toggleable>
      {blogs.map((blog) => (
        <div key={blog.id} className="item">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.user.name}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
