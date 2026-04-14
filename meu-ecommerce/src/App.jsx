import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Cart from './pages/cart'
import Success from './pages/Success'
import { useCart } from './context/CartContext'

function App() {
  const { cartCount } = useCart() // pega a quantidade do Hook
  return(
    <Router>
      <div className="app-container">        
          <nav className="navbar">
              <div className="nav-content">
                <Link to="/" className="logo">DEV.SHOP</Link>
                <Link to="/cart" className="cart-icon">
              🛒 Carrinho: <span>{cartCount}</span>
            </Link>
              </div>
          </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Success" element={<Success />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2026 DevShop - Projeto de Portfólio</p>
        </footer>
      </div>
    </Router>
  )
  
}

export default App
