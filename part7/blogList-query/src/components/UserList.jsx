import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import useUsersQuery from '../hooks/useUsersQuery'

const UserList = () => {
  const { users } = useUsersQuery()

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
