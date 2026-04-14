import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext';
import '../App.css';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, setCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    console.log("Botão clicado!"); // Adicione este log para testar
    setCart([]); // Limpa o estado
    navigate('/success'); // Vai para a página
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="cart-page">
      <h1>Seu Carrinho</h1>
      
      {cart.length === 0 ? (
        <p>
            O carrinho está vazio. <br />
            <Link to="/" className="back-link">Voltar às compras</Link>
        </p>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item-card">
                <img src={item.image} alt={item.title} />
                <div className="item-info">
                  <h4>{item.title}</h4>
                  <p>R$ {item.price.toFixed(2)}</p>
                </div>
                <button onClick={() => removeFromCart(index)}>Remover</button>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              
            ))}
          </div>

          <div className="cart-summary">
            <h3>Resumo</h3>
            <div className="total-line">
              <span>Total:</span>
              <span className="total-price">R$ {total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>Finalizar Compra</button>
          </div>
        </div>
      )}
    </div>
  );
}