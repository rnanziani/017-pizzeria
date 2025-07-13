import { Button, Card, Col, ListGroup } from 'react-bootstrap'

const CardPizza = ({ id, name, price, ingredients, img, desc }) => {
  const formatPrice = (value) => {
    return value.toLocaleString('es-CL')
  }

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
          <div className='d-flex justify-content-around'>
            <Button variant='info' size='sm'>Ver Más 👀</Button>
            <Button variant='danger' size='sm'>Añadir 🛒</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default CardPizza