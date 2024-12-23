import { useState } from 'react'

const useForm = (type = 'text') => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    setValue(e.target.value)
  }
  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset,
  }
}

export default useForm
