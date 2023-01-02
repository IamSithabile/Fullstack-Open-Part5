import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../reducers/usersReducer'

const UsersInfo = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const users = useSelector(state => state.users)

  return (
    <>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} - {user.blogs.length}
          </li>
        ))}
      </ul>
    </>
  )
}

export default UsersInfo
