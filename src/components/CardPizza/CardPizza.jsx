import { Button, Card, Col, ListGroup } from 'react-bootstrap'
import { useCart } from '../../contexts/CartContext'

const CardPizza = ({ id, name, price, ingredients, img, desc }) => {
  const { addToCart, getItemQuantity } = useCart()
  
  const formatPrice = (value) => {
    return value.toLocaleString('es-CL')
  }

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      ingredients,
      img,
      desc
    })
  }

  const quantityInCart = getItemQuantity(id)

  return (
    <Col>
      <Card>
        <Card.Img variant='top' src={img} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <hr />
          <Card.Text>
            Ingredientes:
          </Card.Text>
          <ListGroup variant='flush'>
            {ingredients.map((ingredient, index) => (
              <ListGroup.Item key={index}>
                🍕 {ingredient}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <hr />
          <Card.Text className='text-center h4'>
            $ {formatPrice(price)}
          </Card.Text>
          {quantityInCart > 0 && (
            <div className='text-center mb-2'>
              <small className='text-muted'>
                En carrito: {quantityInCart}
              </small>
            </div>
          )}
          <div className='d-flex justify-content-around'>
            <Button variant='info' size='sm'>Ver Más 👀</Button>
            <Button 
              variant='danger' 
              size='sm'
              onClick={handleAddToCart}
            >
              Añadir 🛒
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default CardPizza