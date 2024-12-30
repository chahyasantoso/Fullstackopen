import { useState } from 'react'

export const useToggle = () => {
  const [visible, setVisible] = useState(false)
  const toggle = () => {
    setVisible(!visible)
  }

  return [visible, toggle]
}
