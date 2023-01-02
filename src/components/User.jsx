import React, { useEffect } from 'react'
import { initializeUser } from '../reducers/userReducer'

import { useDispatch, useSelector } from 'react-redux'

const User = ({ id }) => {
  const dispatch = useDispatch()
  console.log('id:', id)
  useEffect(() => {
    dispatch(initializeUser(id))
  }, [])

  const user = useSelector(state => state.user)
  console.log('user:', user)

  return (
    <>
      <h2>{user.username}</h2>

      <h3>Added blogs</h3>
      {user.blogs ? (
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default User
