import useBlogsMutation from './useBlogsMutation'
import useBlogsQuery from './useBlogsQuery'
import useNotification from './useNotification'
import useUsersQuery from './useUsersQuery'

const useBlogs = () => {
  const { blogs, blogById, appendBlog, updateBlog, deleteBlog } =
    useBlogsQuery()
  const { appendUserBlog, updateUserBlog, deleteUserBlog } = useUsersQuery()
  const { createMutation, likeMutation, deleteMutation, addCommentMutation } =
    useBlogsMutation()
  const { setNotificationTimeout } = useNotification()

  const createBlog = async (blog) =>
    await createMutation.mutateAsync(blog, {
      onSuccess: (newBlog) => {
        appendBlog(newBlog)
        appendUserBlog(newBlog)
        setNotificationTimeout({
          text: `a new blog ${newBlog.title} by ${newBlog.author}`,
        })
      },
    })

  const likeBlog = async (blog) =>
    await likeMutation.mutateAsync(blog, {
      onSuccess: (updatedBlog) => {
        updateBlog(updatedBlog.id, updatedBlog)
        updateUserBlog(updatedBlog.user.id, updatedBlog)
      },
    })

  const removeBlog = async (blog) =>
    await deleteMutation.mutateAsync(blog, {
      onSuccess: (deletedBlog) => {
        deleteBlog(deletedBlog)
        deleteUserBlog(deletedBlog.user.id, deletedBlog)
        setNotificationTimeout({ text: `blog deleted` })
      },
    })

  const addCommentToBlog = async (blog, comment) =>
    await addCommentMutation.mutateAsync(
      { blog, comment },
      {
        onSuccess: (blogWithNewComment) => {
          updateBlog(blogWithNewComment.id, blogWithNewComment)
          updateUserBlog(blogWithNewComment.user.id, blogWithNewComment)
        },
      }
    )

  return {
    blogs,
    blogById,
    createBlog,
    likeBlog,
    removeBlog,
    addCommentToBlog,
  }
}

export default useBlogs
