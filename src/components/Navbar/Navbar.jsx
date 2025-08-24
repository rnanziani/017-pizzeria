import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useUser } from '../../contexts/UserContext'

const Navbar = () => {
  const pizzeriaName = 'Pizzeria Mamma Mia!'
  const { isAuthenticated, logout } = useUser() // 🎯 Usamos el contexto real
  const { total, getCartItemCount } = useCart()

  return (
    <NavbarBs bg='dark' variant='dark' expand='lg' className='mb-4'>
      <Container>
        <NavbarBs.Brand as={Link} to='/'>{pizzeriaName}</NavbarBs.Brand>
        <NavbarBs.Toggle aria-controls='basic-navbar-nav' />
        <NavbarBs.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Button as={Link} to='/' variant='outline-light' className='me-2'>
              🍕 Home
            </Button>
            {isAuthenticated
              ? (
                <>
                  <Button as={Link} to='/profile' variant='outline-light' className='me-2'>
                    👤 Profile
                  </Button>
                  <Button 
                    variant='outline-light' 
                    className='me-2'
                    onClick={logout}
                  >
                    🚪 Logout
                  </Button>
                </>
                )
              : (
                <>
                  <Button as={Link} to='/login' variant='outline-light' className='me-2'>
                    🔐 Login
                  </Button>
                  <Button as={Link} to='/register' variant='outline-light' className='me-2'>
                    📝 Register
                  </Button>
                </>
                )}
          </Nav>
          <Nav>
            <Button as={Link} to='/cart' variant='light'>
              🛒 Total: ${total.toLocaleString('es-CL')} ({getCartItemCount()})
            </Button>
          </Nav>
        </NavbarBs.Collapse>
      </Container>
    </NavbarBs>
  )
}

export default Navbar