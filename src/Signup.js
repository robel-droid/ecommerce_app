import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            address: '',
            phone: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios.post('http://localhost:3001/snup', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            address: this.state.address,
            phone: this.state.phone
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name" 
                        value={this.state.name} 
                        onChange={this.handleInputChange} 
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input 
                        type="email" 
                        name="email" 
                        value={this.state.email} 
                        onChange={this.handleInputChange} 
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input 
                        type="password" 
                        name="password" 
                        value={this.state.password} 
                        onChange={this.handleInputChange} 
                    />
                </label>
                <br />
                <label>
                    Address:
                    <input 
                        type="text" 
                        name="address" 
                        value={this.state.address}
                        onChange={this.handleInputChange}
                        />
                  </label>
                  <br/>
                  <label>
                    Phone:
                    <input 
                      type="text"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.handleInputChange}
                      />
                  </label>
                  <button type="submit">Signup</button>
              </form>
        );
    }}    
export default Signup;
        