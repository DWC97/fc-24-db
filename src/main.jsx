// library
import React from 'react'

// components
import App from './App.jsx'

// routing
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// styling
import "./index.css"

// utilities
import { ScrollToTop } from './utilities/ScrollToTop.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <ScrollToTop />
        <App />
    </BrowserRouter>
  </React.StrictMode>,
)
