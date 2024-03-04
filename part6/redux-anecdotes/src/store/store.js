import { configureStore } from '@reduxjs/toolkit'

import anecdotesReducer from '../reducers/anecdoteReducer'
import filterAnecdotes from '../reducers/filterReducer'
import notificationReducer from '../reducers/notificationReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterAnecdotes,
    notification: notificationReducer
  }
})

export default store