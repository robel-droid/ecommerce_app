import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

const AddToCart = ({ name, price, id }) => {
  const [cookies, setCookie] = useCookies(['cart']);
  const [cartItems, setCartItems] = useState(cookies.cart || []);

  const addToCart = () => {
    let newCartItems = [...cartItems];
    let existingItem = newCartItems.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      newCartItems.push({ name: name, price: price, id: id, quantity: 1 });
    }
    setCartItems(newCartItems);
    setCookie('cart', JSON.stringify(newCartItems), { path: '/' });
  }

  return (
    <div>
      <h2>{name}</h2>
      <p>Price: {price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default AddToCart;
