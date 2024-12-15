import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { resetNotification } from "../reducers/notificationReducer"


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    let timeId
    if (notification) {
      timeId = setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    }

    return () => {
      clearTimeout(timeId)
    }
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification