import './App.css'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Register from './components/Register/Register'
import Login from './components/Login/Login'

function App () {
  return (
    <div>
      <Navbar />
      {/* <Home /> */}
      <Register />
      <Login />
      <Footer />
    </div>
  )
}

export default App
