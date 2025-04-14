import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import KeyContextProvider from './context/KeyContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <KeyContextProvider>
    <App />
  </KeyContextProvider>
)
