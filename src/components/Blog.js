import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'

import { updateBlog, removeBlog } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [user, setUser] = useState()
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  const { id, title, url, author, likes } = blog

  const [show, setShow] = useState(false)

  const removeHandler = async ({ id, author, title }) => {
    const shouldRemove = window.confirm(
      `Remove the blog titled  ${title} by ${author} >?`
    )

    if (shouldRemove) {
      dispatch(removeBlog(id, author, title))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!show) {
    return (
      <div
        style={blogStyle}
        className="blogs"
      >
        <p>{title}</p>
        <p>{author}</p>
        <button
          onClick={() => {
            setShow(true)
          }}
          id="view"
        >
          View
        </button>
      </div>
    )
  }
  return (
    <>
      <div
        style={blogStyle}
        className="blogs"
      >
        <p>{title}</p>
        <p>{url}</p>
        <p>
          {likes}
          <button
            onClick={() => {
              dispatch(updateBlog(id, blog))
            }}
            id="like"
          >
            like
          </button>
        </p>
        <p>{author}</p>
        {blog.user.username === user.username && (
          <button
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={() => {
              removeHandler(blog)
            }}
            id="remove"
          >
            Remove
          </button>
        )}
      </div>
      <button
        onClick={() => {
          setShow(false)
        }}
      >
        Hide
      </button>
    </>
  )
}

export default Blog
