import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
const basename = import.meta.env.DEV ? "/" : "/personal-website";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router basename={basename}>
      <App />
    </Router>
  </StrictMode>,
)
