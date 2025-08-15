import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, ListGroup, Button, Alert } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { usePizza } from '../../contexts/PizzaContext'
import { useCart } from '../../contexts/CartContext'
import './Pizza.css'

const Pizza = () => {
  const [pizza, setPizza] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams() // 🎯 Extraemos el ID de la URL
  const { getPizzaById } = usePizza()
  const { addToCart, getItemQuantity } = useCart()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        setLoading(true)
        // 🎯 Ahora usamos el ID dinámico de la URL
        const data = await getPizzaById(id)
        setPizza(data)
      } catch (error) {
        console.error('Error fetching pizza:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPizza()
  }, [getPizzaById, id]) // 🎯 Agregamos 'id' como dependencia

  const formatPrice = (value) => {
    return value.toLocaleString('es-CL')
  }

  const handleAddToCart = () => {
    if (pizza) {
      addToCart(pizza)
    }
  }

  const quantityInCart = pizza ? getItemQuantity(pizza.id) : 0

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
          <p>Asegúrate de que el backend esté ejecutándose en http://localhost:5001</p>
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
              
              {quantityInCart > 0 && (
                <div className="text-center mb-3">
                  <small className="text-muted">
                    En carrito: {quantityInCart}
                  </small>
                </div>
              )}
              
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
                <Button 
                  variant="danger" 
                  size="lg" 
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                >
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