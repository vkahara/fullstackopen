import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const { notificationState } = useContext(NotificationContext)
  const message = notificationState.errorMessage

  if (message === null) {
    return null
  }

  return <div className='error'>{message}</div>
}

export default Notification
