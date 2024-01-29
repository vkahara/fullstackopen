const Blog = require('../models/blog')

const initialBlogs  = [
  {
    title: 'dinosaurus kissa',
    author: "Valtteri Kähärä",
    url: "https://github.com/vkahara",
    likes: 1337
  },
  {
    title: 'rekka-auto suolakurkku',
    author: "Aku Ankka",
    url: "https://www.akuankka.fi/hahmo/1/aku-ankka",
    likes: 9999
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}




module.exports = {
  initialBlogs, blogsInDb
}