import React, { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import CardPizza from '../../components/CardPizza/CardPizza'
import Header from '../../components/Header/Header'

const Home = () => {
  const [pizzas, setPizzas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5001/api/pizzas')
        
        if (!response.ok) {
          throw new Error('Error al obtener las pizzas')
        }
        
        const data = await response.json()
        setPizzas(data)
      } catch (error) {
        console.error('Error fetching pizzas:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPizzas()
  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <Container>
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-3">Cargando pizzas...</p>
          </div>
        </Container>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <Container>
          <div className="text-center mt-5">
            <div className="alert alert-danger" role="alert">
              <h4>Error al cargar las pizzas</h4>
              <p>{error}</p>
              <p>Asegúrate de que el backend esté ejecutándose en http://localhost:5001</p>
            </div>
          </div>
        </Container>
      </>
    )
  }

  return (
    <>
      <Header />
      <Container>
        <Row xs={1} md={2} lg={3} className='g-4'>
          {pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              id={pizza.id}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              img={pizza.img}
              desc={pizza.desc}
            />
          ))}
        </Row>
      </Container>
    </>
  )
}

export default Home