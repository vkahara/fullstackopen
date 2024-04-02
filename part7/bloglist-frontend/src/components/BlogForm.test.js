import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('call event handler with with right details when blog created', async () => {
  const createMockBlog = jest.fn()
  render(<BlogForm createBlog={createMockBlog} />)

  const user = userEvent.setup()

  const titleInput = screen.getByTestId('title-input')
  const authorInput = screen.getByTestId('author-input')
  const urlInput = screen.getByTestId('url-input')

  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'https://example.com')


  const createButton = screen.getByRole('button', { name: 'create' })
  await user.click(createButton)


  expect(createMockBlog).toHaveBeenCalledTimes(1)
  expect(createMockBlog).toHaveBeenCalledWith({
    title: 'test title',
    author: 'test author',
    url: 'https://example.com',
  })
})