const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

})

describe('favorite blog', () => {
  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      "_id": "65b17c91895a7b1702b0cba6",
      "title": "vakahara päivää",
      "author": "Valtteri Kähärä",
      "url": "github.com/vkahara",
      "likes": 9999,
      "__v": 0
    }
  ]

  
  test('from list of multiple logs, find the on with most likes', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs)
    expect(result).toEqual({
      title: "vakahara päivää",
      author: "Valtteri Kähärä",
      likes: 9999,
    })
  })
  
})

describe('favorite blog', () => {
  const listWithFourBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      "_id": "65b17c91895a7b1702b0cba6",
      "title": "vakahara päivää",
      "author": "Valtteri Kähärä",
      "url": "github.com/vkahara",
      "likes": 9999,
      "__v": 0
    },
    {
      "_id": "65b22417c6cb8e207a35ac17",
      "title": "First class tests",
      "author": "Robert C. Martin",
      "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      "likes": 10,
      "__v": 0
    },
    {
      "_id": "65b22423c6cb8e207a35ac19",
      "title": "TDD harms architecture",
      "author": "Robert C. Martin",
      "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      "likes": 0,
      "__v": 0
    },
  ]

  test('from list of multiple blogs, find the author who has most blogs', () => {
    const result = listHelper.mostBlogs(listWithFourBlogs)
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 2
    })
  })

})