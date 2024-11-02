import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ addToFavorites, addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    
  };

  const handleAddToFavorites = () => {
    addToFavorites(product);
    
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Цена: {product.price} руб.</p>
      <button onClick={handleAddToCart}>Добавить в корзину</button>
      <button onClick={handleAddToFavorites}>Добавить в избранное</button>
    </div>
  );
};

export default ProductDetail;
