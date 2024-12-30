import { useState, forwardRef, useImperativeHandle } from 'react'
import { useToggle } from '../hooks/useToggle'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Toggleable = forwardRef(
  ({ children, className, showLabel, hideLabel }, ref) => {
    const [visible, toggle] = useToggle()

    const showButton = showLabel ? (
      <Button onClick={toggle}>{showLabel}</Button>
    ) : null

    const hideButton = hideLabel ? (
      <Button onClick={toggle}>{hideLabel}</Button>
    ) : null

    useImperativeHandle(ref, () => ({
      toggle,
    }))

    return (
      <div className={className}>
        {visible ? children : showButton}
        {visible ? hideButton : null}
      </div>
    )
  }
)

Toggleable.displayName = 'Toggleable'

export default Toggleable
