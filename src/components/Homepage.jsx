import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import BlogList from './BlogList'
import NewBlog from './NewBlog'
import Notification from './Notification'
import Toggable from './Toggable'
import UsersInfo from './UsersInfo'

const Homepage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  const logoutHandler = async () => {
    dispatch(logoutUser())
  }

  return (
    <div>
      <Notification />
      <div>
        <h2>User</h2>
        <p>{user.username} logged in</p>
        <button
          onClick={logoutHandler}
          id="logout-button"
        >
          Logout
        </button>
      </div>
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
