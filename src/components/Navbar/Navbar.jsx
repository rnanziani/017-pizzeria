import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'

const Navbar = ({ total }) => {
  const pizzeriaName = 'Pizzeria Mamma Mia!'
  const token = true // Simulación de token de autenticación

  return (
    <NavbarBs bg='dark' variant='dark' expand='lg' className='mb-4'>
      <Container>
        <NavbarBs.Brand href='#home'>{pizzeriaName}</NavbarBs.Brand>
        <NavbarBs.Toggle aria-controls='basic-navbar-nav' />
        <NavbarBs.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Button variant='outline-light' className='me-2'>🍕 Home</Button>
            {token
              ? (
                <>
                  <Button variant='outline-light' className='me-2'>🔓 Profile</Button>
                  <Button variant='outline-light' className='me-2'>🔒 Logout</Button>
                </>
                )
              : (
                <>
                  <Button variant='outline-light' className='me-2'>🔐 Login</Button>
                  <Button variant='outline-light' className='me-2'>🔐 Register</Button>
                </>
                )}
          </Nav>
          <Nav>
            <Button variant='light'>
              🛒 Total: ${total.toLocaleString('es-CL')}
            </Button>
          </Nav>
        </NavbarBs.Collapse>
      </Container>
    </NavbarBs>
  )
}

export default Navbar