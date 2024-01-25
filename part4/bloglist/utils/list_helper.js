// dummy take blogs do nothing just return 1
const dummy = (blogs) => {
  return 1
}

// return sum of likes from a list of blog posts
const totalLikes = (blogPosts) => {
  return blogPosts.reduce((sum, blog) => sum + blog.likes, 0)
}

module.exports = {
  dummy, totalLikes
}