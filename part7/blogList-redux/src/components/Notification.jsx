import Alert from 'react-bootstrap/Alert'
import useNotification from '../hooks/useNotification'

const Notification = () => {
  const { text, type } = useNotification()
  if (!text) {
    return null
  }

  return <Alert variant={type}>{text}</Alert>
}

export default Notification
