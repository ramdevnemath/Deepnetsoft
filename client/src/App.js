import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications'
import Home from './pages/home'
import Products from './pages/Products'
import AddCategory from './pages/AddCategory'
import AddProduct from './pages/AddProduct'

function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/products' Component={Products} />
          <Route path='/add-category' Component={AddCategory} />
          <Route path='/add-product' Component={AddProduct} />
        </Routes>
      </Router>
    </ToastProvider>
  )
}

export default App