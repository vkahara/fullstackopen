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



afterAll(async () => {
  await mongoose.connection.close()
})