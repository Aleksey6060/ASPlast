import React from 'react';

const ProductCard = ({ product, addToFavorites, addToCart, removeFromFavorites }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Цена: {product.price} руб.</p>
      {addToFavorites && <button onClick={() => addToFavorites(product)} className="favorite-btn">Добавить в избранное</button>}
      {addToCart && <button onClick={() => addToCart(product)}>Добавить в корзину</button>}
      {removeFromFavorites && <button onClick={() => removeFromFavorites(product.id)}>Удалить из избранного</button>}
    </div>
  );
};

export default ProductCard;
