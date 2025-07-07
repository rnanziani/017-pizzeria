import './App.css'
import { useState } from 'react';
import { pizzaCart } from './data/pizzas';
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Register from './components/Register/Register'
import Login from './components/Login/Login'

function App () {
  const [cart, setCart] = useState(pizzaCart);
  const total = cart.reduce((sum, p) => sum + p.price * Math.max(0, p.quantity), 0);

  return (
    <div>
      <Navbar total={total} />
      {/* <Home /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      <Cart cart={cart} setCart={setCart} />
      <Footer />

    </div>
  )
}
export default App
