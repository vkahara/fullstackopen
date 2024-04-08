import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Comments from '../components/Comments'
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'

const BlogDetail = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getById(id),
  })

  if (isLoading) return <div>...loading</div>

  const likeAction = async () => {
    await blogService.like({ ...blog, likes: blog.likes + 1 })
    queryClient.invalidateQueries(['blog', id])
  }

  const deleteAction = async () => {
    const isConfirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )

    if (isConfirmed) {
      await blogService.remove(blog.id)
      queryClient.invalidateQueries(['blog', id])
      navigate('/')
    }
  }
  const deleteButton = () => (
    <div>
      <Button variant='danger' onClick={deleteAction}>
        remove
      </Button>
    </div>
  )
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <ListGroup>
        <ListGroupItem variant='dark'>{blog.url}</ListGroupItem>

        <ListGroupItem variant='dark'>
          likes {blog.likes}
          <Button size='sm' className='likeButton' onClick={likeAction}>
            like
          </Button>
        </ListGroupItem>

        <ListGroupItem variant='dark'> added by {blog.user.name}</ListGroupItem>
        <div>{user.id === blog.user.id && deleteButton()}</div>
        <Comments id={id} />
      </ListGroup>
    </div>
  )
}

export default BlogDetail
