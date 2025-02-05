import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userSessionReducer, {
  initializeUserSession,
} from './reducers/userSessionReducer'
import usersReducer from './reducers/usersReducer'
import { BrowserRouter as Router } from 'react-router-dom'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    userSession: userSessionReducer,
    blogs: blogsReducer,
    users: usersReducer,
  },
})

store.dispatch(initializeUserSession())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
