import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'
import configureAxios from './services/configureAxios'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { UserSessionContextProvider } from './contexts/UserSessionContext'

//configureAxios(store)

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const text = error.response?.data?.error ?? error.message
      // do setNotification
      console.error(text)
      if (text.includes('token expired')) {
        // do logout
      }
    },
  }),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <UserSessionContextProvider>
      <NotificationContextProvider>
        <Router>
          <App />
        </Router>
      </NotificationContextProvider>
    </UserSessionContextProvider>
  </QueryClientProvider>
)
