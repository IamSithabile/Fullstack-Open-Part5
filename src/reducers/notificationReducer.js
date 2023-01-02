import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      if (action.payload === null) return null
      const { info, className } = action.payload
      return { info, className }
    },
  },
})

export const { setNotification } = notificationSlice.actions

export const displayNotification = notification => {
  return async dispatch => {
    dispatch(setNotification(notification))

    setTimeout(() => {
      dispatch(setNotification(null))
    }, 3000)
  }
}

export default notificationSlice.reducer
