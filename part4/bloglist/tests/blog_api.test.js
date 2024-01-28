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

  const blogsAtEnd = await helper.notesInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  expect(contents).toContaint('test post test post')
})


afterAll(async () => {
  await mongoose.connection.close()
})