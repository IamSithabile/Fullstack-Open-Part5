import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const [user, setUser] = useState()
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')

    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  const { id, title, author } = blog

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div
      style={blogStyle}
      className="blogs"
    >
      <Link to={`/blogs/${id}`}>{title}</Link>
      <p>{author}</p>
    </div>
  )
}

export default Blog
