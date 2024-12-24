import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks/useField'

const CreateForm = ({ onCreate }) => {
  const title = useField()
  const author = useField()
  const url = useField()

  const dispatch = useDispatch()

  const reset = () => {
    title.onReset()
    author.onReset()
    url.onReset()
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const blog = { title: title.value, author: author.value, url: url.value }
    try {
      const newBlog = await dispatch(createBlog(blog))
      dispatch(
        setNotification({
          text: `a new blog ${newBlog.title} by ${newBlog.author}`,
        })
      )
      if (onCreate) {
        onCreate()
      }
    } catch (error) {
      console.log(error)
      dispatch(
        setNotification({
          text: error.response?.data?.error,
          type: 'error',
        })
      )
    } finally {
      reset()
    }
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          Title :
          <input data-testid="title" id="title" {...title} />
        </div>
        <div>
          Author : <input data-testid="author" id="author" {...author} />
        </div>
        <div>
          URL : <input data-testid="url" id="url" {...url} />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateForm
