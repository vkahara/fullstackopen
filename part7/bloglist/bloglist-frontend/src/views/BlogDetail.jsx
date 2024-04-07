import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'

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
      <button onClick={deleteAction}>remove</button>
    </div>
  )
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button className='likeButton' onClick={likeAction}>
          like
        </button>
      </div>
      <div> added by {blog.user.name}</div>
      <div>{user.id === blog.user.id && deleteButton()}</div>
    </div>
  )
}

export default BlogDetail
