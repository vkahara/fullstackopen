const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
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
    likes: 1000
  }

  await api
    .post('/api/blogs')
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
    .send(blogWithoutLikes)
    .expect(201)

  const blogsAtEnd = await helper.blogsInDb()
  const blog = blogsAtEnd.pop()
  expect(blog.likes).toBe(0)
})


afterAll(async () => {
  await mongoose.connection.close()
})