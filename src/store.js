import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    blog: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
