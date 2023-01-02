import { createSlice } from '@reduxjs/toolkit'
import login from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.data
    },
  },
})

export const { setUser } = userSlice.actions

export const loginUser = userDetails => {
  return async dispatch => {
    const user = await login(userDetails)
    console.log(user)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer
