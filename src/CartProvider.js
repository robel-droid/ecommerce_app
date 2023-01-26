import React, { useState } from 'react';

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    setCart(cart.filter(i => i !== item));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => React.useContext(CartContext);

export { CartProvider, useCart };
