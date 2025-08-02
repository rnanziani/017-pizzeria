import React from 'react'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Profile.css'

const Profile = () => {
  // Datos estáticos del usuario (en el futuro vendrán de la autenticación)
  const userEmail = 'usuario@ejemplo.com'
  const userName = 'Usuario Ejemplo'
  const joinDate = 'Enero 2024'

  const handleLogout = () => {
    // Por ahora solo muestra un alert, en el futuro manejará la autenticación
    alert('Función de cerrar sesión - Se implementará en el siguiente hito')
  }

  return (
    <Container className="profile-container">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="profile-card">
            <Card.Body className="text-center">
              <div className="profile-avatar">
                <span className="avatar-icon">👤</span>
              </div>
              
              <Card.Title className="profile-title">
                {userName}
              </Card.Title>
              
              <Card.Text className="profile-email">
                📧 {userEmail}
              </Card.Text>
              
              <Badge bg="info" className="profile-badge">
                Miembro desde {joinDate}
              </Badge>
              
              <hr className="profile-divider" />
              
              <div className="profile-stats">
                <div className="stat-item">
                  <h4>🍕</h4>
                  <p>Pizzas Pedidas</p>
                  <span className="stat-number">12</span>
                </div>
                <div className="stat-item">
                  <h4>⭐</h4>
                  <p>Puntos</p>
                  <span className="stat-number">150</span>
                </div>
                <div className="stat-item">
                  <h4>🎯</h4>
                  <p>Pedidos</p>
                  <span className="stat-number">8</span>
                </div>
              </div>
              
              <hr className="profile-divider" />
              
              <div className="profile-actions">
                <Link to="/">
                  <Button variant="outline-primary" className="action-btn">
                    🏠 Volver al Menú
                  </Button>
                </Link>
                
                <Button 
                  variant="danger" 
                  className="action-btn logout-btn"
                  onClick={handleLogout}
                >
                  🚪 Cerrar Sesión
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile 