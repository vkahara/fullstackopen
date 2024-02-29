import { configureStore } from '@reduxjs/toolkit'

import anecdotesReducer from '../reducers/anecdoteReducer'
import filterAnecdotes from '../reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterAnecdotes
  }
})

export default store