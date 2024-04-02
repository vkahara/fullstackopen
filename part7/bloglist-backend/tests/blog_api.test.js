const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const bcrypt = require('bcrypt')
const User = require('../models/user')

let token
let user

beforeAll(async () => {
  await api
    .post('/api/users')
    .send({ username: 'testuser', password: 'testpassword' })

  const response = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'testpassword' })

  token = response.body.token

  user = await User.findOne({ username: 'testuser' });
})

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({ ...blog, user: user._id })
    await blogObject.save()
  }
}, 100000)

test('correct amount of blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
  expect(response.status).toBe(200)
  expect(response.headers['content-type']).toMatch(/application\/json/)
},100000)

test('unique identifier is id', async () => {

  const blogsAtStart = await helper.blogsInDb()
  const blogToCheck = blogsAtStart[0]

  const checkBlog = await api
    .get(`/api/blogs/${blogToCheck.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  expect(checkBlog.body.id).toBeDefined()

})

test('new post can be added', async () => {
  const newBlog = {
    title: 'test post test post',
    author: 'masa',
    url: 'https://www.audi.fi',
    likes: 1000,
    userId: "65be12112ab153122c6ddb5e"
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(n => n.title)
  expect(titles).toContain('test post test post')
})

test('likeless entries likes default to zero', async () => {
  const blogWithoutLikes = {
    title: 'likeless blog',
    author: "Valtteri Kähärä",
    url: "https://github.com/vkahara",
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutLikes)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  const blog = blogsAtEnd.pop()
  expect(blog.likes).toBe(0)
})

test('if title or url missing 400', async () => {
  const blogMissingTitle = {
    author: "Valtteri Kähärä",
    url: "https://github.com/vkahara",
    likes: 123,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogMissingTitle)
    .expect(400)

  const blogMissingUrl = {
    title: "test test",
    author: "Valtteri Kähärä",
    likes: 123,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogMissingUrl)
    .expect(400)
})

test('delete blog 204 if id valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  console.log("blogtodelete", blogToDelete)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const title = blogsAtEnd.map(r => r.title)

  expect(title).not.toContain(blogToDelete.title)
})

test('edit blog likes 200 if ok', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToEdit = blogsAtStart[0]

  const updatedBlog = {
    likes: 1000
  }

  await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).toBe(updatedBlog.likes)
})


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('cannot post invalid user', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: 'moimoi',
      Name: 'Moikka moi',
      password: '12'
    }

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('password must be at least 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})