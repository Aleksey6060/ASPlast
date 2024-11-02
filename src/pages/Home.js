import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion'; 
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import '../App.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/products?_limit=10')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const onSubmit = (data) => {
    const emailData = {
      from_name: data.name,
      to_name: 'Admin', 
      message: data.message,
      reply_to: data.email
    };

    emailjs.send('service_m2z3rqt', 'template_k3f0ebw', emailData, 'LIKO3eE3WmS1NI1H4')
      .then((result) => {
        console.log(result.text);
        setFormStatus('Сообщение отправлено!');
        reset();
      }, (error) => {
        console.log(error.text);
        setFormStatus('Ошибка при отправке сообщения.');
      });
  };

  return (
    <div className="home-container">
      <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="animate__animated animate__fadeInDown">
        Добро пожаловать в наш интернет-магазин часов!
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="animate__animated animate__fadeInUp">
        Мы предлагаем широкий ассортимент часов на любой вкус. Наша коллекция включает в себя мужские, женские, спортивные, умные и механические часы.
      </motion.p>
      
      <motion.h2 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }} className="animate__animated animate__fadeInLeft">Популярные товары</motion.h2>
      <div className="product-list">
        {products.map(product => (
          <motion.div key={product.id} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="animate__animated animate__zoomIn">
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      <motion.h2 initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }} className="animate__animated animate__fadeInLeft">Свяжитесь с нами</motion.h2>
      <form className="contact-form animate__animated animate__fadeInRight" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Ваше имя" {...register('name', { required: true })} />
        <input type="email" placeholder="Ваш email" {...register('email', { required: true })} />
        <textarea placeholder="Ваше сообщение" {...register('message', { required: true })}></textarea>
        <button type="submit">Отправить</button>
      </form>
      {formStatus && <p>{formStatus}</p>}
    </div>
  );
};

export default Home;
