import { useState } from 'react'

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

  const create = e => {
    e.preventDefault()
    reset()
    onSubmit({ title, author, url })
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={create}>
        <div>
          Title : <input type='text' value={title} onChange={handleTitleChange} />
        </div>
        <div>
          Author : <input type='text' value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          URL : <input type='text' value={url} onChange={handleUrlChange} />
        </div>
        <div>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
      
  )
}

export default CreateForm