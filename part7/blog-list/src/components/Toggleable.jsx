import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef(({ children, showLabel, hideLabel }, ref) => {
  const [visible, setVisible] = useState(false)
  const toggle = (e) => {
    setVisible(!visible)
  }
  const showButton = showLabel ? (
    <button onClick={toggle}>{showLabel}</button>
  ) : null

  const hideButton = hideLabel ? (
    <button onClick={toggle}>{hideLabel}</button>
  ) : null

  useImperativeHandle(ref, () => ({
    toggle,
  }))

  return (
    <div>
      {visible ? children : showButton}
      {visible ? hideButton : null}
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable
