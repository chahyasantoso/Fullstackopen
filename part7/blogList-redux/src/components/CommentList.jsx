import { useDispatch } from 'react-redux'
import { useField } from '../hooks/useField'
import { addComment } from '../reducers/blogsReducer'

const CommentList = ({ blog }) => {
  const commentInput = useField('text')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const comment = { content: commentInput.value }
    await dispatch(addComment(blog, comment))
    commentInput.onReset()
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input {...commentInput}></input>
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>
        })}
      </ul>
    </div>
  )
}

export default CommentList
