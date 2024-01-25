// dummy take blogs do nothing just return 1
const dummy = (blogs) => {
  return 1
}

// return sum of likes from a list of blog posts
const totalLikes = (blogPosts) => {
  return blogPosts.reduce((sum, blog) => sum + blog.likes, 0)
}

//return blog that has the most likes in pretty fromat
const favoriteBlog = (blogPosts) => {

  const favorite = blogPosts.reduce((max, blog) => {
    return (max.likes > blog.likes) ? max : blog
  })

  return ({
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  })
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}