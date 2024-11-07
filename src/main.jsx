import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthContextProvider  } from './components/context/AuthContext.jsx';
import { SocketContextProvider } from './components/context/SocketContext.jsx';
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
