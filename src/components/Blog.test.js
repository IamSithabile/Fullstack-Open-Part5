import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('that Blog renders title and author', () => {
  const blog = {
    author: 'Zwai',
    title: 'How to masterfully be a master',
    url: 'www.beamaster.com',
    likes: 563,
  }

  render(<Blog {...{ blog }} />)

  const titleElement = screen.getByText('How to masterfully be a master')
  const authorElement = screen.getByText('Zwai')
  const urlElement = screen.queryByText('www.beamaster.com')

  expect(titleElement).toHaveTextContent('How to masterfully be a master')
  expect(authorElement).toHaveTextContent('Zwai')
  expect(urlElement).toBeNull()
})

test('that Blog renders url and likes when button clicked', async () => {
  const blog = {
    author: 'Zwai',
    title: 'How to masterfully be a master',
    url: 'www.beamaster.com',
    likes: 563,
    user: { username: 'root' },
  }
  const user = { username: 'root' }

  const simUser = userEvent.setup()

  render(<Blog {...{ blog, user }} />)

  const buttonElement = screen.getByRole('button', { name: /view/i })
  await simUser.click(buttonElement)

  const urlElement = screen.queryByText('www.beamaster.com')
  const likesElement = screen.queryByText(563)

  expect(urlElement).toHaveTextContent('www.beamaster.com')
  expect(likesElement).toHaveTextContent(563)
})

test('that likehandler called twice if button clicked twice', async () => {
  const blog = {
    author: 'Zwai',
    title: 'How to masterfully be a master',
    url: 'www.beamaster.com',
    likes: 563,
    user: { username: 'root' },
  }
  const user = { username: 'root' }

  const simUser = userEvent.setup()

  const updateBlog = jest.fn()

  render(<Blog {...{ blog, user, updateBlog }} />)

  const buttonElement = screen.getByRole('button', { name: /view/i })
  await simUser.click(buttonElement)

  const likeElement = screen.getByRole('button', { name: /like/i })

  await simUser.click(likeElement)
  await simUser.click(likeElement)

  expect(updateBlog.mock.calls).toHaveLength(2)
})
