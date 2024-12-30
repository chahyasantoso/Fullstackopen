import { createSelector } from '@reduxjs/toolkit'
import Card from 'react-bootstrap/Card'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const userSelector = createSelector(
  (state) => state.users, // input1 => users
  (state, id) => id, // input2 => id
  (users, id) => users.find((user) => user.id === id) //output berdasarkan input1 dan input2
)

const User = () => {
  const params = useParams()
  const user = useSelector((state) => userSelector(state, params.id))

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
