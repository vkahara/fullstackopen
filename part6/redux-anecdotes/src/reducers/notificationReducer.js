import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const { displayNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(displayNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)

  }
}

export default notificationSlice.reducer