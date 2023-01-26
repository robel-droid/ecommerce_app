import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import './Cart.css';
import Checkout from './Checkout';
const Cart = () => {
const [cookies, setCookie] = useCookies(['cart']);

let items = [];
try {
items = JSON.parse(cookies.cart);
} catch (e) {
console.log(e);
items = cookies.cart || [];
}
const [itemList, setItems] = useState(items);
const addToCart = (product) => {
    let newItems = [...itemList];
    let existingProductIndex = newItems.findIndex(item => item.id === product.id);
    if (existingProductIndex === -1) {
        newItems.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    } else {
        newItems[existingProductIndex].quantity += 1;
    }
    setItems(newItems);
    setCookie('cart', JSON.stringify(newItems));
}

const removeFromCart = (index) => {
    let newItems = [...itemList];
    newItems.splice(index, 1);
    setItems(newItems);
    setCookie('cart', JSON.stringify(newItems));
}

const total = itemList.reduce((total, item) => total + parseFloat(item.price) * parseInt(item.quantity), 0);

return (
    <div>
        <h1>Cart</h1>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {itemList.map((item, index) => (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}</td>
                        <td><button onClick={() => removeFromCart(index)}>Remove</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <h2>Total: {(total)} Birr</h2>
        <Checkout prod={items} totalPrice={total}/>
    </div>
);
}

export default Cart;