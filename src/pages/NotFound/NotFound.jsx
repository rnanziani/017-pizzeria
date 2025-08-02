import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './NotFound.css'

const NotFound = () => {
  return (
    <Container className="not-found-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={8} className="text-center">
          <div className="not-found-content">
            <h1 className="error-code">404</h1>
            <h2 className="error-title">¡Oops! Pizza no encontrada</h2>
            <p className="error-message">
              Parece que esta pizza se perdió en el horno. 
              La página que buscas no existe o se ha movido.
            </p>
            
            <div className="pizza-animation">
              <div className="pizza-slice">🍕</div>
              <div className="pizza-slice">🍕</div>
              <div className="pizza-slice">🍕</div>
            </div>
            
            <div className="mt-4">
              <Link to="/">
                <Button variant="danger" size="lg" className="home-btn">
                  🏠 Volver al Menú Principal
                </Button>
              </Link>
            </div>
            
            <div className="mt-3">
              <p className="text-muted">
                ¿Buscas algo específico? Prueba navegando desde nuestro menú principal.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default NotFound 