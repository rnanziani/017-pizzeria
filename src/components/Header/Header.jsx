
import 'Header/Header.css'

import headerImage from '../assets/img/Header.jpg'; // Importar la imagen

const Header = () => {
  return (
    <header className="header" style={{ backgroundImage: `url(${headerImage})` }}>
      <div className="header-content">
        <h1 className="header-title">¡Pizzería Mamma Mia!</h1>
        <p className="header-description">Tenemos las mejores pizzas que podrás encontrar.</p>
      </div>
    </header>
  );
};

export default Header;