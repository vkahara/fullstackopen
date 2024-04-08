import userService from '../services/users'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const User = () => {
  const id = useParams().id
  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => userService.getById(id),
  })

  if (isLoading) return <div>...loading</div>

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ListGroup>
        {user &&
          user.blogs.map(blog => (
            <ListGroupItem variant='dark' key={blog.id}>
              {blog.title}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  )
}
export default User
