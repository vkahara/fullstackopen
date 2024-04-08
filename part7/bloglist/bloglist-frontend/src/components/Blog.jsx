import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <td>
      <div className='blog'>
        <Link to={`blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </td>
  )
}

export default Blog
