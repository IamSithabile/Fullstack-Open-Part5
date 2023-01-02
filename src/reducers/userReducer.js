import { createSlice } from '@reduxjs/toolkit'
import login from '../services/login'
import { getUser } from '../services/users'
import { displayNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logoutUser() {
      window.localStorage.removeItem('loggedInUser')
      return null
    },
    mergeUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser, logoutUser, mergeUser } = userSlice.actions

export const loginUser = userDetails => {
  return async dispatch => {
    try {
      const user = await login(userDetails)
      console.log(user)
      dispatch(setUser(user))
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(displayNotification({ info: 'Successfully logged in' }))
    } catch (error) {
      console.log('failure to log in because :->', error)
      displayNotification({
        className: 'error',
        info: 'Wrong username or password',
      })
    }
  }
}

export const initializeUser = id => {
  return async dispatch => {
    const user = await getUser(id)
    console.log(user)
    dispatch(mergeUser(user))
  }
}

export default userSlice.reducer
