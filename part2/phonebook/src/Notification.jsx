const Notification = ({message}) => {
  if (message === null) return null

  const {text, type} = message
  return (
      <div className={type}>{text}</div>
  )
}

export default Notification