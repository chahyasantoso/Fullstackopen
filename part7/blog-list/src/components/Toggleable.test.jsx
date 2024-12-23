import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Toggleable from './Toggleable'

describe('<Toggleable />', () => {
  let container

  beforeEach(() => {
    container = render(
      <Toggleable showLabel="show..." hideLabel="cancel">
        <div className="testDiv" >
          togglable content
        </div>
      </Toggleable>
    ).container
  })

  test('at start the children are not rendered', () => {
    const div = container.querySelector('.testDiv')
    expect(div).toBeNull()
  })

  test('after clicking the button, children are rendered', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.testDiv')
    expect(div).toBeDefined()
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.testDiv')
    expect(div).toBeNull()
  })
})