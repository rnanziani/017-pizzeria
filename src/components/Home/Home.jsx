import React from 'react'
import { Container, Row } from 'react-bootstrap'
import pizza1 from '../../assets/img/pizza1.jpeg'
import pizza2 from '../../assets/img/pizza2.jpeg'
import pizza3 from '../../assets/img/pizza3.jpeg'
import CardPizza from '../CardPizza/CardPizza'
import Header from '../Header/Header'

const Home = () => {
  const pizzas = [
    {
      name: 'Napolitana',
      price: 5950,
      ingredients: ['mozzarella', 'tomates', 'jamón', 'orégano'],
      img: pizza1
    },
    {
      name: 'Española',
      price: 6950,
      ingredients: ['mozzarella', 'gorgonzola', 'parmesano', 'provolone'],
      img: pizza2
    },
    {
      name: 'Pepperoni',
      price: 6950,
      ingredients: ['mozzarella', 'pepperoni', 'orégano'],
      img: pizza3
    }
  ]

  return (
    <>
      <Header />
      <Container>
        <Row xs={1} md={2} lg={3} className='g-4'>
          {pizzas.map((pizza) => (
            <CardPizza
              key={pizza.name}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              img={pizza.img}
            />
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Home