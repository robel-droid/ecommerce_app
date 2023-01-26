import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import AddToCart from "./AddToCart";
import { useCookies } from "react-cookie";
const BrowseProduct = () => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [cookies] = useCookies(['login']);
    const soldout= false;
    const handleSearch = event => {
        event.preventDefault(); 
        axios
        .get(`http://localhost:3001/searchProducts?search=${search}`)
        .then(response => {
            setProducts(response.data.products);
        })
        .catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        axios
        .get("http://localhost:3001/products")
        .then(response => {
            setProducts(response.data.products);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);
    if(cookies.login){
    return (
        
        <div>
            <form className="search-form" onSubmit={handleSearch}>
                <label>
                Search:
                <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />
                </label>
                <button type="submit">Search</button>
        </form>
        <h1 align="center">PRODUCTS</h1>
        <div className="browse">
            
            {products.map(product => (
            <div key={product.id} className="product-card">
                <p>Name: {product.name}</p>
                <p>Description: {product.description}</p>
                <p>Price: {product.price}</p>
                
                <div>
            {product.quantity === 0 ? (<p>Sold out</p> ) : (
                <p>Available quantity: {product.quantity}</p>)}
            </div>

                <img src={`http://localhost:3001/uploads/${product.image}`} alt={product.name} />
             <div>   
               {product.quantity === 0 ? ( 
               <div><h2>{product.name}</h2>
                <p>Price: {product.price}</p>
                <button>Add to Cart</button></div>):( 
                <AddToCart 
                name={product.name}
                price={product.price}
                id={product.id}/>)}
            </div>
            </div>
            ))}</div>
        </div>

    );}
    };

    export default BrowseProduct;
