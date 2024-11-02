import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css'; 

const Header = ({ favoritesCount, cartCount }) => {
  return (
    <header className="header">
      <div className="logo">
        Knights Of Time
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" exact activeClassName="active" className="nav-link">Главная</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/catalog" activeClassName="active" className="nav-link">Каталог</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/favorites" activeClassName="active" className="nav-link">
              Избранное 
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/cart" activeClassName="active" className="nav-link">
              Корзина 
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
