import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

export const useUsers = (select) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    select,
    staleTime: Infinity,
  })
}

export const useUser = (id) => {
  return useUsers((users) => users.find((user) => user.id === id))
}
