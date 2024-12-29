import Card from 'react-bootstrap/Card'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <Card className="mb-3">
      <Card.Header as="h3">{user.name}</Card.Header>
      <Card.Body>
        <h5>Added blogs</h5>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  )
}

export default User
