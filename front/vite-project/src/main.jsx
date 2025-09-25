import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UsersProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <UsersProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UsersProvider>
  </StrictMode>
)
