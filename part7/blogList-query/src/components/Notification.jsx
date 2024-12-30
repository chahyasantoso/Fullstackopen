import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const { text, type } = useSelector((state) => state.notification)
  if (!text) {
    return null
  }

  return <Alert variant={type}>{text}</Alert>
}

export default Notification
