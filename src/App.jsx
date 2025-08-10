import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { CartProvider } from './contexts/CartContext';
import { PizzaProvider } from './contexts/PizzaContext';

// Componentes de páginas
import Home from './pages/Home/Home'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Cart from './pages/Cart/Cart'
import Pizza from './pages/Pizza/Pizza'
import Profile from './pages/Profile/Profile'
import NotFound from './pages/NotFound/NotFound'

// Componentes de layout
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

function App () {
  return (
    <PizzaProvider>
      <CartProvider>
        <Router>
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/p001" element={<Pizza />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </PizzaProvider>
  )
}

export default App
