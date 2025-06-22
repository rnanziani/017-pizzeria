import headerImage from '../../assets/img/Header.jpg' // Corregir la ruta de la imagen
import './Header.css'

const Header = () => {
  const headerStyle = {
    backgroundImage: `url(${headerImage})`
  }

  return (
    <header
      className='header-main'
      style={headerStyle}
    >
      <div className='header-content'>
        <h1>¡Pizzería Mamma Mia!</h1>
        <p>Tenemos las mejores pizzas que podrás encontrar.</p>
        <hr />
      </div>
    </header>
  )
}

export default Header