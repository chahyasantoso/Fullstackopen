import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userSessionReducer'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const Menu = () => {
  const userSession = useSelector((state) => state.userSession)
  const dispatch = useDispatch()

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link href="#" as={Link} to="/">
              Blogs
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" as={Link} to="/users">
              Users
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {userSession ? (
              <Nav.Link href="#" as="span">
                <em className="p-3">{userSession.name} logged in</em>
                <Button
                  size="sm"
                  type="button"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Button>
              </Nav.Link>
            ) : (
              <Nav.Link href="#" as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu
