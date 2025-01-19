import Card from 'react-bootstrap/Card'
import { useNavigate, useParams } from 'react-router-dom'
import { useUser } from '../hooks/useUsers'
import Shimmer from './Shimmer'
import { useError } from '../hooks/useError'

const User = () => {
  const { id: userId } = useParams()
  const { data: user, isSuccess, isError, error } = useUser(userId)
  const navigate = useNavigate()
  const { handleError } = useError()

  const isUserNotFound = isSuccess && !user
  const handleUserNotFound = () => {
    handleError(error, 'User not found')
    navigate('/users')
  }

  return (
    <Shimmer
      isSuccess={isSuccess}
      isError={isError || isUserNotFound}
      onError={handleUserNotFound}
    >
      <Card className="mb-3">
        <Card.Header as="h3">{user?.name}</Card.Header>
        <Card.Body>
          <h5>Added blogs</h5>
          <ul>
            {user?.blogs.length === 0 && <div>No data</div>}
            {user?.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Shimmer>
  )
}

export default User
