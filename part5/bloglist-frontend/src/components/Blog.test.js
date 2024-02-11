import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'https://example.com',
      likes: 9999,
      user: {
        id: 1,
        name: 'testuser'
      }
    }
    const user = {
      id: 1,
      name: 'testuser'
    }
    container = render(<Blog blog={blog} user={user} />).container
  })

  test('render title and author but not url and likes', () => {
    expect(container.textContent).toContain('test title')
    expect(container.textContent).toContain('test author')

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

})

