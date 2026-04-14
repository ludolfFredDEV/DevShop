import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="success-container" style={{ textAlign: 'center', padding: '50px' }}>
      <div className="success-icon" style={{ 
        fontSize: '50px', 
        background: '#10b981', 
        color: 'white', 
        width: '80px', 
        height: '80px', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto 20px'
      }}>
        ✓
      </div>
      <h1>Pedido Realizado!</h1>
      <p>Obrigado pela sua compra. Seu pedido já está sendo processado.</p>
      <Link to="/" className="back-link" style={{ 
        display: 'inline-block', 
        marginTop: '20px', 
        padding: '10px 20px', 
        backgroundColor: '#2563eb', 
        color: 'white', 
        borderRadius: '8px' 
      }}>
        Voltar para a Loja
      </Link>
    </div>
  );
}