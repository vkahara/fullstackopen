import blogService from '../services/blogs'
import { useQuery } from '@tanstack/react-query'

const Comments = ({ id }) => {
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comment', id],
    queryFn: () => blogService.getComments(id),
  })

  if (isLoading) return <div>...loading</div>

  if (!comments || comments.length === 0) return null

  return (
    <div>
      <h2>comments</h2>
      <div>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </div>
    </div>
  )
}

export default Comments
