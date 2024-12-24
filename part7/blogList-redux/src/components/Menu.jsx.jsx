import React from 'react'
import { Link } from 'react-router-dom'

export const ./components/Menu.jsx = ({navStyle, userSession, dispatch, logout}) => (
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
