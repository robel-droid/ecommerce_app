import React, { useState } from 'react';

function Navbar() {
  const [navCollapsed, setNavCollapsed] = useState(true);

  const toggleNav = () => {
    setNavCollapsed(!navCollapsed);
  }

  return (
    <nav>
      <button id="nav-toggle" onClick={toggleNav}>Menu</button>
      { !navCollapsed && (
        <ul id="nav-menu">
          <li><Link to="/">Login</Link></li>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/browserProduct">Browse Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
          <li><Link to="/logout">Logout</Link></li>
          <li><Link to="/add-product">Add Product</Link></li>
          <li><Link to="/transactions">My Transactions</Link></li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar;
