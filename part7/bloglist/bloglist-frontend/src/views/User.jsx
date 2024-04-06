import userService from '../services/users'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

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
      <ul>
        {user && user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}
export default User
