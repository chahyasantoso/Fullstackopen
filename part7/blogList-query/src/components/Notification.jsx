import Alert from 'react-bootstrap/Alert'
import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  const { text, type } = notification

  if (!text) {
    return null
  }

  return <Alert variant={type}>{text}</Alert>
}

export default Notification
