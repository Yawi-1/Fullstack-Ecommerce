import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import ShopContextProvider from './Components/Context/ShopContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ShopContextProvider>
  </React.StrictMode>,
)
