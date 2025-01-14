import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import { useUsers } from '../hooks/useUsers'
import BlogPlaceholder, { ListPlaceholder } from './BlogPlaceholder'

const UserList = () => {
  const { data: users, isSuccess, isError, error } = useUsers()

  return (
    <BlogPlaceholder
      placeholder={<ListPlaceholder />}
      isSuccess={isSuccess}
      isError={isError}
    >
      <Table striped>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
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
    </BlogPlaceholder>
  )
}

export default UserList
