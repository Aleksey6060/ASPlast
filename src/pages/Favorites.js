import React from 'react';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion'; 
import '../App.css'; 

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="favorites-container">
      <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="favorites-heading animate__animated animate__fadeInDown">Избранные товары</motion.h1>
      <div className="product-list">
        {favorites.length === 0 ? (
          <p>В избранном пока нет товаров.</p>
        ) : (
          favorites.map(product => (
            <motion.div key={product.id} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="animate__animated animate__zoomIn">
              <ProductCard product={product} removeFromFavorites={removeFromFavorites} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
