const _ = require('lodash');

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

// find author who has the most blogs
const mostBlogs = (blogPosts) => {
  const countByAuthor = _.countBy(blogPosts, 'author')
  const authorCounts = _.map(_.toPairs(countByAuthor), ([author, blogs]) => ({ author, blogs}))
  const mostBlogsAuthor = _.maxBy(authorCounts, 'blogs')
  console.log("most blogs", mostBlogsAuthor);
  return mostBlogsAuthor
}


// find author who has the most likes
const mostLikes = (blogPosts) => {

  const groupedByAuthor = _.groupBy(blogPosts, 'author')
  const likesByAuthor = _.mapValues(groupedByAuthor, (blogs) =>
    _.sumBy(blogs, 'likes'))

  const mostLikesAuthor = _.maxBy(_.toPairs(likesByAuthor), _.last)
  return ({
    author: mostLikesAuthor[0],
    likes: mostLikesAuthor[1]
  })
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}