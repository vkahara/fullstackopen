import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'

const Users = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  })

  return (
    <div>
      <h2>Users</h2>
      {users && users.map(user => <li key={user.id}>{user.name}</li>)}
    </div>
  )
}

export default Users
