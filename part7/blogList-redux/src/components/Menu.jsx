import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userSessionReducer'

const Menu = () => {
  const userSession = useSelector((state) => state.userSession)
  const dispatch = useDispatch()

  const navStyle = {
    display: 'block',
    margin: 5,
  }
  return (
    <div>
      <Link className={navStyle} to="/">
        blogs
      </Link>
      <Link className={navStyle} to="/users">
        users
      </Link>
      <span className={navStyle}>
        {userSession.name} logged in
        <button onClick={() => dispatch(logout())}>Logout</button>
      </span>
    </div>
  )
}

export default Menu
