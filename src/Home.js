//import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
//import axios from 'axios';
import BrowseProduct from './BrowseProducts';
import './App.css';
const Home = () => {
 // const [products, setProducts] = useState([]);
  const [cookies] = useCookies(['login']);
/*
  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
*/
  return (
    <div>
      <h1>Welcome, {cookies.login.name}</h1>
      
      <div>
       <BrowseProduct/>
      </div>
    </div>
  );
};

export default Home;
