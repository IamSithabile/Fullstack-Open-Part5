import { createSlice } from '@reduxjs/toolkit'
import login from '../services/login'
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
  },
})

export const { setUser, logoutUser } = userSlice.actions

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

export default userSlice.reducer
