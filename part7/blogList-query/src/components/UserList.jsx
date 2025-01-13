import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import { useUsers } from '../hooks/useUsers'
import BlogListPlaceHolder from './BlogListPlaceholder'

const UserList = () => {
  const { data: users, isSuccess, isError, error } = useUsers()

  return (
    <BlogListPlaceHolder isSuccess={isSuccess} isError={isError}>
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
    </BlogListPlaceHolder>
  )
}

export default UserList
