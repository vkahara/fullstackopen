import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  })

  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
