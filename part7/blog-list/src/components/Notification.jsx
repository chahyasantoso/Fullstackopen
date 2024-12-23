import { useSelector } from 'react-redux'

const Notification = () => {
  const { text, type } = useSelector((state) => state.notification)
  if (!text) {
    return null
  }

  return (
    <div>
      <h2 className={type}>{text}</h2>
    </div>
  )
}

export default Notification
