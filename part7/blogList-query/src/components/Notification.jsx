import Alert from 'react-bootstrap/Alert'
import useNotification from '../hooks/useNotification'

const Notification = () => {
  const { notification } = useNotification()
  const { text, type } = notification

  if (!text) {
    return null
  }

  return <Alert variant={type}>{text}</Alert>
}

export default Notification
