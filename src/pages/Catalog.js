import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion'; 
import '../App.css'; 

const Catalog = ({ addToFavorites, addToCart }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === '' || product.category === category)
  );

  return (
    <div className="catalog-container">
      <motion.h1 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="catalog-heading animate__animated animate__fadeInLeft">Каталог товаров</motion.h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск товаров"
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          value={category}
          onChange={handleCategory}
          className="category-select"
        >
          <option value="">Все категории</option>
          <option value="Мужские">Мужские</option>
          <option value="Женские">Женские</option>
          <option value="Спортивные">Спортивные</option>
          <option value="Умные">Умные</option>
          <option value="Механические">Механические</option>
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <motion.div key={product.id} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="animate__animated animate__zoomIn">
            <ProductCard
              key={product.id}
              product={product}
              addToFavorites={addToFavorites}
              addToCart={addToCart}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
