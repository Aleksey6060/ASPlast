import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Favorites from './pages/Favorites';
import CartAndOrder from './pages/CartAndOrder';
import ProductDetail from './pages/ProductDetail';
import './App.css'; // Подключаем файл стилей

/*json-server --watch db.json --port 3001*/

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some(item => item.id === product.id)) {
        setFavoritesCount(prevCount => prevCount + 1);
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      if (!prevCart.some(item => item.id === product.id)) {
        setCartCount(prevCount => prevCount + 1);
        return [...prevCart, product];
      }
      return prevCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    setCartCount(prevCount => prevCount - 1);
  };

  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) => prevFavorites.filter(item => item.id !== productId));
    setFavoritesCount(prevCount => prevCount - 1);
  };

  return (
    <Router>
      <div className="background-video">
        <video autoPlay loop muted>
          <source src="/videofon.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="content">
        <Header favoritesCount={favoritesCount} cartCount={cartCount} />
        <main>
          <Route path="/" exact component={Home} />
          <Route 
            path="/catalog" 
            render={(props) => <Catalog {...props} addToFavorites={addToFavorites} addToCart={addToCart} />} 
          />
          <Route 
            path="/favorites" 
            render={(props) => <Favorites {...props} favorites={favorites} removeFromFavorites={removeFromFavorites} />} 
          />
          <Route 
            path="/cart" 
            render={(props) => <CartAndOrder {...props} cart={cart} removeFromCart={removeFromCart} />} 
          />
          <Route path="/product/:id" component={ProductDetail} />
          <Route 
            path="/order" 
            render={(props) => <CartAndOrder {...props} cart={cart} removeFromCart={removeFromCart} />} 
          />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
