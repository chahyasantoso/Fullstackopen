import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userSessionReducer from './reducers/userSessionReducer'
import usersReducer from './reducers/usersReducer'
import { BrowserRouter as Router } from 'react-router-dom'
import configureAxios from './services/configureAxios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    userSession: userSessionReducer,
    blogs: blogsReducer,
    users: usersReducer,
  },
})

configureAxios(store)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </QueryClientProvider>
)
