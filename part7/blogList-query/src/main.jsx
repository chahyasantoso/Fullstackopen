import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { UserSessionContextProvider } from './contexts/UserSessionContext'

const queryClient = new QueryClient()

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
