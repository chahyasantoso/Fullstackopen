import { useState, forwardRef, useImperativeHandle } from 'react'
import { useToggle } from '../hooks/useToggle'

const Toggleable = forwardRef(({ children, showLabel, hideLabel }, ref) => {
  const [visible, toggle] = useToggle()

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
