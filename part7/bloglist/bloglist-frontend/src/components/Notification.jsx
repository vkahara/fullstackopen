import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const { notificationState } = useContext(NotificationContext)
  const message = notificationState.message

  if (message === null) {
    return null
  }

  return <div className='message'>{message}</div>
}

export default Notification
