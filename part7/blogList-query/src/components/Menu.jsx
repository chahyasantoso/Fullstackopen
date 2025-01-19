import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import useAuth from '../hooks/useAuth'
import useNotification from '../hooks/useNotification'
import { useError } from '../hooks/useError'

const Menu = () => {
  const { userSession, isLoading, logout } = useAuth()
  const { handleError } = useError()
  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      handleError(error, "can't logout, clear your browser storage to logout")
    }
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link
              href="#"
              as={Link}
              to="/"
              disabled={isLoading || !userSession}
            >
              Blogs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#"
              as={Link}
              to="/users"
              disabled={isLoading || !userSession}
            >
              Users
            </Nav.Link>
          </Nav.Item>
          {userSession && (
            <Nav.Item>
              <Nav.Link href="#" as="span">
                <em className="p-3">{userSession?.name} logged in</em>
                <Button
                  size="sm"
                  type="button"
                  disabled={isLoading}
                  onClick={handleLogout}
                >
                  {isLoading && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      className="mx-2"
                    />
                  )}
                  Logout
                </Button>
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
