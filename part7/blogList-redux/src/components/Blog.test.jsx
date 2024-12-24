import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'blog 1',
    author: 'chahya',
    url: 'xxx',
    user: {}
  }

  test('at start renders only title and author, and not url and likes', async () => {
    const { container } = render(<Blog blog={blog} user={{}} />)

    await screen.findByText(`${blog.title} ${blog.author}`)

    const urlDiv = container.querySelector('.url')
    expect(urlDiv).toBeNull()
    const likesDiv = container.querySelector('.likes')
    expect(likesDiv).toBeNull()
  })

  test('clicking the view button shows blogs url and likes', async () => {
    const { container } = render(<Blog blog={blog} user={{}} />)

    const event = userEvent.setup()
    const button = screen.getByText('View')
    await event.click(button)

    const urlDiv = container.querySelector('.url')
    expect(urlDiv).toBeDefined()
    const likesDiv = container.querySelector('.likes')
    expect(likesDiv).toBeDefined()
  })

  test('clicking the like button twice calls the event handler twice', async () => {
    const handler = vi.fn()
    render(<Blog blog={blog} user={{}} onLike={handler} />)

    const event = userEvent.setup()
    const button = screen.getByText('View')
    await event.click(button)

    const likeButton = screen.getByText('Like')
    await event.click(likeButton)
    await event.click(likeButton)

    expect(handler.mock.calls).toHaveLength(2)
  })
})

