import Swal from 'sweetalert2';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  const handleAdd = (id) => {
    setCart(prevCart =>
      prevCart.map(p =>
        p.id === id
          ? { ...p, quantity: Number(p.quantity) + 1 }
          : p
      )
    );
  };

  const handleRemove = (id) => {
    setCart(prevCart => {
      const pizza = prevCart.find(p => p.id === id);
      if (pizza.quantity === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Atención',
          text: 'No se puede disminuir más. La cantidad ya es cero.'
        });
        return prevCart;
      }
      return prevCart.map(p =>
        p.id === id ? { ...p, quantity: Number(p.quantity) - 1 } : p
      );
    });
  };

  const total = cart.reduce((sum, p) => sum + p.price * Math.max(0, p.quantity), 0);

  return (
    <main className="cart-main">
      <h2>Detalles del pedido:</h2>
      <div className="cart-list">
        {cart.map(pizza => (
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
              onClick={() => handleAdd(pizza.id)}
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
        <button className="cart-pay-btn-blue">Pagar</button>
      </div>
    </main>
  );
};

export default Cart;