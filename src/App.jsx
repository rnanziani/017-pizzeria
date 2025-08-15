import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { CartProvider } from './contexts/CartContext';
import { PizzaProvider } from './contexts/PizzaContext';
import { UserProvider } from './contexts/UserContext';

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
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute/ProtectedRoute'

function App () {
  return (
    <UserProvider>
      <PizzaProvider>
        <CartProvider>
          <Router>
          <div>
            <Navbar />
            <Routes>
              {/* 🎯 Rutas públicas - accesibles para todos */}
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/pizza/:id" element={<Pizza />} />
              <Route path="/404" element={<NotFound />} />
              
              {/* 🎯 Rutas públicas - solo para no autenticados */}
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              
              {/* 🎯 Rutas protegidas - solo para autenticados */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* 🎯 Ruta catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
          </Router>
        </CartProvider>
      </PizzaProvider>
    </UserProvider>
  )
}

export default App
