import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import BrowserProduct from './BrowseProducts';
import Cart from './Cart';
import Signup from './Signup';
import Checkout from './Checkout';
import Logout from './Logout';
import AddProduct from './AddProduct';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import TransactionHistory from './TransactionHistory';
import Header from './Header';

function App() {
  
  return (

    <Router>
      <div>
      <center><Header/></center>
      <nav>
  <ul id="nav-menu">
    <li><Link to="/">Login</Link></li>
    <li><Link to="/home">Home</Link></li>
    <li><Link to="Signup">Signup</Link></li>
    <li><Link to="/browserProduct">Browse Products</Link></li>
    <li><Link to="/cart">Cart</Link></li>
    <li><Link to="/checkout">Checkout</Link></li>
    <li><Link to="/logout">Logout</Link></li>
    <li><Link to="/add-product">Add Product</Link></li>
    <li><Link to="/transactions">My Transactions</Link></li>
  </ul>
  
</nav>

</div>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/BrowserProduct/" component={BrowserProduct} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/logout" component={Logout}/>
        <Route path="/Signup" component={Signup}/>
        <Route path="/add-product" component={AddProduct}/>
        <Route path="/transactions" component={TransactionHistory}/>

      </Switch>
    </Router>
  );
}

export default App;
