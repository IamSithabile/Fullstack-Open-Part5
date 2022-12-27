import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const { id, title, url, author, likes } = blog

  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!show) {
    return (
      <div style={blogStyle}>
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
      <div style={blogStyle}>
        <p>{title}</p>
        <p>{url}</p>
        <p>
          {likes}
          <button
            onClick={() => {
              updateBlog(id, blog)
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
              removeBlog(blog)
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
