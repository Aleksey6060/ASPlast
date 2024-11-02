import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion'; 
import '../App.css';

const CartAndOrder = ({ cart, removeFromCart }) => {
  const form = useRef();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
paymentMethod: '',
    captcha: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateCaptcha = () => {
    const captchaText = Math.random().toString(36).substring(7);
    setCaptchaValue(captchaText);
  };

  const checkCaptcha = (value) => {
    if (value.toLowerCase() === captchaValue.toLowerCase()) {
      return true;
    } else {
      setCaptchaError(true);
      return false;
    }
  };

  const getCartInfo = () => {
    if (!cart || cart.length === 0) {
      return 'Корзина пуста';
    }
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    return cart.map(product => `${product.name} - ${product.price} руб.\n`).join('') + `\nИтого: ${total} руб.`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkCaptcha(formData.captcha)) {
      setCaptchaError(true);
      return;
    }

    if (!cart || cart.length === 0) {
      setErrorMessage('Ваша корзина пуста. Добавьте товары перед оформлением заказа.');
      return;
    }

    const emailData = {
      to_name: formData.fullName,
      from_name: 'Knights Of Time',
      message: 'Ваш заказ был успешно оформлен.',
      cartInfo: getCartInfo(),
      address: formData.address,
      paymentMethod: formData.paymentMethod,
    };

    emailjs
      .send('service_m2z3rqt', 'template_zztmhk9', emailData, 'LIKO3eE3WmS1NI1H4')
      .then(
        (result) => {
          console.log(result.text);
          setSuccessMessage('Заказ успешно отправлен на почту.');
          setFormData({
            fullName: '',
            address: '',
            paymentMethod: '',
            captcha: '',
          });
          setCaptchaValue('');
          setCaptchaError(false);
        },
        (error) => {
          console.log(error.text);
          setErrorMessage('Ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.');
        }
      );
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="cart-order-container">
      <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="cart-heading animate__animated animate__fadeInDown">Корзина и Оформление заказа</motion.h1>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Корзина пуста</p>
      ) : (
        <div>
          <div className="product-list">
            {cart.map(product => (
              <motion.div key={product.id} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">Цена: {product.price} руб.</p>
                  <button className="remove-button" onClick={() => handleRemove(product.id)}>Удалить</button>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.h2 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="total animate__animated animate__fadeInUp">Итого: {total} руб.</motion.h2>
        </div>
      )}
      <div className="order-container">
        <h1>Оформление заказа</h1>
        <form ref={form} onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label>ФИО:</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Адрес:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Способ оплаты:</label>
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
              <option value="">Выберите способ оплаты</option>
              <option value="Наличными">Наличными</option>
              <option value="Кредитной картой">Кредитной картой</option>
            </select>
          </div>
          <div className="captcha-container">
            <img src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYlJJQglhexDwxxb5qDeD32EcPbd-d0gQPWQ&s${captchaValue}`} alt="Captcha" onClick={generateCaptcha} />
            <input
              type="text"
              name="captcha"
              value="W68HP"
              onChange={handleChange}
              className={captchaError ? 'error' : ''}
            />
            {captchaError && <p className="error-message">Неверно введена капча</p>}
          </div>
          <div className="submit-group">
            <button type="submit">Оформить заказ</button>
          </div>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CartAndOrder;