import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'
import NewBlog from './NewBlog'

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

test('that form calls addBlog with supplied details', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  const match = {
    author: 'Kent C. Dodds',
    title: 'How to use the react testing library',
    url: 'www.kentcdodds.com',
  }

  render(<NewBlog {...{ addBlog }} />)

  const titleElement = screen.getByPlaceholderText('Enter the blog title')
  const authorElement = screen.getByPlaceholderText('Enter the blog author')
  const urlElement = screen.getByPlaceholderText('Enter the blog url')
  const buttonElement = screen.getByRole('button', /create/i)

  await user.type(titleElement, 'How to use the react testing library')
  await user.type(authorElement, 'Kent C. Dodds')
  await user.type(urlElement, 'www.kentcdodds.com')

  await user.click(buttonElement)

  const returnedMockObject = addBlog.mock.calls[0][0]

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(returnedMockObject).toStrictEqual(match)
})
