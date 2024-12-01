const Notification = ({ message }) => {
  return message
    ? (
      <div>
        <h2 className={message.type}>{message.text}</h2>
      </div>
    )
    : null
}

export default Notification