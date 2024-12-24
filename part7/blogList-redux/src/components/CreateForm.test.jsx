import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'

describe('<CreateForm />', () => {

  test('on submit, form calls the event handler with the correct details', async () => {
    const blogInput = {
      title: 'blog 1',
      author: 'chahya',
      url: 'xxx',
    }
    const submitHandler = vi.fn()
    const { container } = render(<CreateForm onSubmit={submitHandler} />)

    const inputTitle = screen.getByTestId('title')
    const inputAuthor = screen.getByTestId('author')
    const inputUrl = screen.getByTestId('url')
    const buttonSubmit = screen.getByText('Create')

    const event = userEvent.setup()
    await event.type(inputTitle, blogInput.title)
    await event.type(inputAuthor, blogInput.author)
    await event.type(inputUrl, blogInput.url)
    await event.click(buttonSubmit)

    expect(submitHandler.mock.calls).toHaveLength(1)
    expect(submitHandler.mock.calls[0][0]).toEqual({ ...blogInput })
  })
})

