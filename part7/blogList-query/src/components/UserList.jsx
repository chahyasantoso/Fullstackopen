import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import { useUsers } from '../hooks/useUsers'
import Shimmer, { ListShimmer } from './Shimmer'
import { useError } from '../hooks/useError'

const UserList = () => {
  const { data: users, isSuccess, isError, error } = useUsers()
  const { handleError } = useError()

  return (
    <Shimmer
      as={<ListShimmer />}
      isSuccess={isSuccess}
      isError={isError}
      onError={() => handleError(error)}
      errorElement={<div>Error fetching list</div>}
    >
      <Table striped>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users?.length === 0 && (
            <tr>
              <td colSpan={2}>No Data</td>
            </tr>
          )}
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
    </Shimmer>
  )
}

export default UserList
