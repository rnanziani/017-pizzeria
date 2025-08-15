import Swal from 'sweetalert2';
import './Cart.css';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, total, addToCart, removeFromCart, clearCart } = useCart();
  const { token } = useUser(); // 🎯 Obtenemos el estado de autenticación
  const navigate = useNavigate(); // 🎯 Para redireccionar al home después del pago

  const handleAdd = (pizza) => {
    addToCart(pizza);
  };

  const handleRemove = (id) => {
    const pizza = items.find(p => p.id === id);
    if (pizza && pizza.quantity === 1) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: '¿Estás seguro de que quieres eliminar esta pizza del carrito?',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          removeFromCart(id);
        }
      });
    } else {
      removeFromCart(id);
    }
  };

  const handleClearCart = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Vaciar carrito',
      text: '¿Estás seguro de que quieres vaciar todo el carrito?',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
      }
    });
  };

  // 🎯 Nueva función para manejar el pago
  const handlePayment = () => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    
    Swal.fire({
      icon: 'success',
      title: '¡Pago Exitoso! 🎉',
      html: `
        <div style="text-align: center;">
          <p><strong>Tu pedido ha sido procesado correctamente</strong></p>
          <p>📦 Cantidad de items: <strong>${itemCount}</strong></p>
          <p>💰 Total pagado: <strong>$${total.toLocaleString('es-CL')}</strong></p>
          <p>🚚 Tu pedido llegará en 30-45 minutos</p>
          <p>¡Gracias por elegir Pizzeria Mamma Mia!</p>
        </div>
      `,
      confirmButtonText: 'Continuar comprando',
      confirmButtonColor: '#28a745',
      timer: 5000,
      timerProgressBar: true
    }).then(() => {
      // 🎯 Vaciar el carrito después del pago exitoso
      clearCart();
      // 🎯 Redireccionar al home
      navigate('/');
    });
  };

  if (items.length === 0) {
    return (
      <main className="cart-main">
        <h2>Tu carrito está vacío</h2>
        <div className="text-center mt-4">
          <p>No tienes productos en tu carrito de compras.</p>
          <a href="/" className="btn btn-primary">
            🍕 Ir a comprar pizzas
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-main">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Detalles del pedido:</h2>
        <button 
          className="btn btn-outline-danger btn-sm"
          onClick={handleClearCart}
        >
          🗑️ Vaciar carrito
        </button>
      </div>
      <div className="cart-list">
        {items.map(pizza => (
          <div className="cart-item" key={pizza.id}>
            <img src={pizza.img} alt={pizza.name} className="cart-img" />
            <span className="cart-name">{pizza.name}</span>
            <span className="cart-price">${pizza.price.toLocaleString('es-CL')}</span>
            <button
              type="button"
              className="cart-btn"
              aria-label={`Quitar una ${pizza.name}`}
              onClick={() => handleRemove(pizza.id)}
            >
              -
            </button>
            <span className="cart-qty">{pizza.quantity}</span>
            <button
              type="button"
              className="cart-btn"
              aria-label={`Agregar una ${pizza.name}`}
              onClick={() => handleAdd(pizza)}
            >
              +
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total-row">
        <div className="cart-total-label">
          <span>Total:</span>
          <span>${total.toLocaleString('es-CL')}</span>
        </div>
        <button 
          className="cart-pay-btn-blue"
          disabled={!token}
          onClick={token ? handlePayment : undefined}
          style={{
            opacity: !token ? 0.5 : 1,
            cursor: !token ? 'not-allowed' : 'pointer'
          }}
          title={!token ? 'Debes iniciar sesión para pagar' : 'Procesar pago'}
        >
          {!token ? '🔒 Inicia sesión para pagar' : 'Pagar'}
        </button>
      </div>
    </main>
  );
};

export default Cart;