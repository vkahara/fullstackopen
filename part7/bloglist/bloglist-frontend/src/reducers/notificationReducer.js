/* eslint-disable indent */
export const notificationInitialState = {
  message: null,
  errorMessage: null,
}

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, message: action.payload }
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload }
    case 'CLEAR_MESSAGE':
      return { ...state, message: null }
    case 'CLEAR_ERROR_MESSAGE':
      return { ...state, errorMessage: null }
    default:
      return state
  }
}
