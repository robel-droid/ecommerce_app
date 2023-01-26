import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import Home from "./Home";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie] = useCookies(['login']);

  const handleSubmit = async event => {
    event.preventDefault();
    // check if login cookie is present
    if (!cookies.login) {
    // make POST request to login endpoint
    axios.post('http://localhost:3001/lgn', {
    email: email,
    password: password
    })
    .then((response) => {
    if (response.data.status === 'success') {
    // set login cookie
    setCookie('login', response.data.user, { path: '/', maxAge: 86400 });
    setIsLoggedIn(true);
    } else {
      // handle error
          setIsLoggedIn(true);
          alert(response.data.message);
    }
    })
    .catch((error) => {
    console.log(error);
    });
    } else {
        // handle error - user is already logged in
        alert("You are already logged in");
    }

    };

 

    return (
      <>
        {isLoggedIn ? (
        <>
        <Home />
         
        
        
        </>
      ) : (
    <form onSubmit={handleSubmit}>
    <label>
        Email:
        <input
        type="email"
        name="email"
        value={email}
        onChange={event => setEmail(event.target.value)} />
    </label>
    <br/>
    <label>
        Password:
        <input
        type="password"
        name="password"
        value={password}
        onChange={event => setPassword(event.target.value)}/>
        </label>
    <br />
    <button type="submit">Login</button>
    </form>
    )}
     </>
  );
  };

export default Login;