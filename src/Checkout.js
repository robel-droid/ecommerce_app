import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Checkout = ({ prod, totalPrice }) => {
  const [cookies, setCookies] = useCookies(['cart', 'login']);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (status === 'success') {
      setCookies('cart', []);
    }
  }, [status, setCookies]);

  const handleCheckout = async () => {
    try {
      const res = await axios.post('/checkout', {
        customer_id: cookies.login.id,
        total: totalPrice,
        products: prod
      });
      setStatus(res.data.status);
    } catch (error) {
      setStatus('error');
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout}>Checkout</button>
      <p>{status === 'success' ? 'Order placed successfully' : 'Error placing order'}</p>
    </div>
  );
}

export default Checkout;
