import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // O que aparece na tela
  const [category, setCategory] = useState('all'); // Categoria ativa
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  // Mágica do Filtro: Toda vez que a categoria mudar, filtramos a lista original
  useEffect(() => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      setFilteredProducts(filtered);
    }
  }, [category, products]);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: "electronics", label: 'Eletrônicos' },
    { id: "jewelery", label: 'Joias' },
    { id: "men's clothing", label: 'Roupas Masculinas' },
    { id: "women's clothing", label: 'Roupas Femininas' }
  ];

  return (
    <div className="home-container">
      {/* BARRA DE CATEGORIAS */}
      <div className="categories-bar">
        {categories.map(cat => (
          <button 
            key={cat.id}
            className={category === cat.id ? 'active' : ''}
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* VITRINE */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <div className="product-price">
              <span>R$</span> {product.price.toFixed(2).replace('.', ',')}
            </div>
            <button className="add-button" onClick={() => addToCart(product)}>
              Adicionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}