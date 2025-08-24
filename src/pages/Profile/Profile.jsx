import React from 'react'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../contexts/UserContext'
import Swal from 'sweetalert2'
import './Profile.css'

const Profile = () => {
  const { userEmail, userProfile, logout, loading } = useUser()
  const navigate = useNavigate()

  // 🎯 Función para manejar el logout
  const handleLogout = () => {
    Swal.fire({
      icon: 'question',
      title: '¿Cerrar sesión?',
      text: '¿Estás seguro de que quieres cerrar tu sesión?',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        logout() // 🎯 Llamar al método logout del contexto
        navigate('/') // 🎯 Redirigir al home
        Swal.fire({
          icon: 'success',
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente.',
          timer: 1500,
          showConfirmButton: false
        })
      }
    })
  }

  // 🎯 Si no hay usuario autenticado, redirigir al login
  if (!userEmail) {
    navigate('/login')
    return null
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
                {userProfile?.name || 'Usuario'}
              </Card.Title>
              
              <Card.Text className="profile-email">
                📧 {userEmail}
              </Card.Text>
              
              <Badge bg="info" className="profile-badge">
                Miembro desde {userProfile?.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long' 
                }) : 'Recientemente'}
              </Badge>
              
              <hr className="profile-divider" />
              
              <div className="profile-stats">
                <div className="stat-item">
                  <h4>🍕</h4>
                  <p>Pizzas Pedidas</p>
                  <span className="stat-number">{userProfile?.pizzasOrdered || 0}</span>
                </div>
                <div className="stat-item">
                  <h4>⭐</h4>
                  <p>Puntos</p>
                  <span className="stat-number">{userProfile?.points || 0}</span>
                </div>
                <div className="stat-item">
                  <h4>🎯</h4>
                  <p>Pedidos</p>
                  <span className="stat-number">{userProfile?.ordersCount || 0}</span>
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
                  disabled={loading}
                >
                  {loading ? 'Cerrando sesión...' : '🚪 Cerrar Sesión'}
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