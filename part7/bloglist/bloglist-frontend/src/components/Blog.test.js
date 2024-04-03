import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  let like

  beforeEach(() => {
    const blog = {
      title: 'test title',
      author: 'test author',
      url: 'https://example.com',
      likes: 0,
      user: {
        id: 1,
        name: 'testuser',
      },
    }
    const user = {
      id: 1,
      name: 'testuser',
    }

    like = jest.fn()

    container = render(<Blog blog={blog} user={user} like={like} />).container
  })

  test('render title and author but not url and likes', () => {
    expect(container.textContent).toContain('test title')
    expect(container.textContent).toContain('test author')

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('if like is pressed twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(like).toHaveBeenCalledTimes(2)
  })
})
