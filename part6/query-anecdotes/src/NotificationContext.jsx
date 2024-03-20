import { createContext, useContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
  }
}

const NotificationContext = createContext()

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  return context[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}


export default NotificationContext