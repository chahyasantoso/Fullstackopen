import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = e => setTitle(e.target.value)
  const handleAuthorChange = e => setAuthor(e.target.value)
  const handleUrlChange = e => setUrl(e.target.value)
  const reset = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const create = async e => {
    e.preventDefault()
    await onSubmit({ title, author, url })
    reset()
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={create}>
        <div>
          Title : <input data-testid='title' id='title' type='text' value={title} onChange={handleTitleChange} />
        </div>
        <div>
          Author : <input data-testid='author' id='author' type='text' value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          URL : <input data-testid='url' id='url' type='text' value={url} onChange={handleUrlChange} />
        </div>
        <div>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  )
}

CreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default CreateForm