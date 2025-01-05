import useUsersQuery from './useUsersQuery'

const useUsers = () => {
  const { users, userById } = useUsersQuery()
  return {
    users,
    userById,
  }
}

export default useUsers
