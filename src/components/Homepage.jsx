import React, { useRef } from 'react'

import BlogList from './BlogList'
import NewBlog from './NewBlog'
import Notification from './Notification'
import Toggable from './Toggable'
import UsersInfo from './UsersInfo'

const Homepage = () => {
  const blogFormRef = useRef()

  return (
    <div>
      <Notification />

      <br />
      <UsersInfo />
      <br />
      <Toggable
        label="Create new blog"
        ref={blogFormRef}
      >
        <NewBlog />
      </Toggable>

      <h2>blogs</h2>
      <BlogList />
    </div>
  )
}

export default Homepage
