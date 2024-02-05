import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('error', exception)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)

    } catch (exception) {
      console.log('error', exception)
    }
  }
  
  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
          <div>
            username
            <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <form onSubmit={addBlog}>

        <div>title:<input type='text' value={newTitle} onChange={(event) => setNewTitle(event.target.value)}/></div>
        <div>author:<input type='text' value={newAuthor} onChange={(event) => setNewAuthor(event.target.value)}/></div>
        <div>url:<input type='text' value={newUrl} onChange={(event) => setNewUrl(event.target.value)}/></div>

        <button type="submit">create</button>
      </form>
    </div>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={ handleLogout }>logout</button>
      </p>
      <h2>create new</h2>
      {blogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && showBlogs()}
      
    </div>
  )
}

export default App