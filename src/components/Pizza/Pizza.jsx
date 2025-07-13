import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, ListGroup, Button, Alert } from 'react-bootstrap'
import './Pizza.css'

const Pizza = () => {
  const [pizza, setPizza] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true)
        // Por ahora usamos un ID fijo como p001, en el siguiente hito será dinámico
        const response = await fetch('http://localhost:5001/api/pizzas/p001')
        
        if (!response.ok) {
          throw new Error('Error al obtener la pizza')
        }
        
        const data = await response.json()
        setPizza(data)
      } catch (error) {
        console.error('Error fetching pizza:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPizza()
  }, [])

  const formatPrice = (value) => {
    return value.toLocaleString('es-CL')
  }

  if (loading) {
    return (
      <Container className="pizza-container">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando pizza...</p>
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="pizza-container">
        <Alert variant="danger">
          <Alert.Heading>Error al cargar la pizza</Alert.Heading>
          <p>{error}</p>
          <p>Asegúrate de que el backend esté ejecutándose en http://localhost:5000</p>
        </Alert>
      </Container>
    )
  }

  if (!pizza) {
    return (
      <Container className="pizza-container">
        <Alert variant="warning">
          <Alert.Heading>Pizza no encontrada</Alert.Heading>
          <p>No se pudo encontrar la pizza solicitada.</p>
        </Alert>
      </Container>
    )
  }

  return (
    <Container className="pizza-container">
      <Row>
        <Col lg={6}>
          <Card className="pizza-image">
            <Card.Img 
              variant="top" 
              src={pizza.img} 
              alt={`Pizza ${pizza.name}`}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Card>
        </Col>
        <Col lg={6}>
          <Card className="pizza-details">
            <Card.Body>
              <Card.Title className="h2 mb-3 pizza-title">{pizza.name}</Card.Title>
              
              <Card.Text className="h4 pizza-price mb-4">
                $ {formatPrice(pizza.price)}
              </Card.Text>
              
              <hr />
              
              <Card.Text className="h5 mb-3">Ingredientes:</Card.Text>
              <ListGroup variant="flush" className="ingredients-list mb-4">
                {pizza.ingredients.map((ingredient, index) => (
                  <ListGroup.Item key={index} className="ingredient-item d-flex align-items-center">
                    <span className="me-2">🍕</span>
                    {ingredient}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              
              <hr />
              
              <Card.Text className="h5 mb-3">Descripción:</Card.Text>
              <Card.Text className="pizza-description">
                {pizza.desc}
              </Card.Text>
              
              <hr />
              
              <div className="d-grid gap-2">
                <Button variant="danger" size="lg" className="add-to-cart-btn">
                  Añadir al Carrito 🛒
                </Button>
                <Button variant="outline-secondary" size="sm" className="back-btn">
                  Volver al Menú
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Pizza 