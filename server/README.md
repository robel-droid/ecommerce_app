Server.js

This is the server file for the project which is responsible for the back-end functionality. It is built using Node.js and Express framework, and connects to a MySQL database for data storage and retrieval.

The server file is responsible for handling all the HTTP requests made by the client-side, such as user authentication, product browsing, adding to cart, and making transactions. It also includes middleware functions for validating user inputs, protecting routes, and handling errors.

The server is built following the Model-View-Controller(MVC) architecture, which separates the application logic into three interconnected components: the model, responsible for data management; the view, responsible for displaying data; and the controller, responsible for handling user input and interactions.
Dependencies

    Express
    MySQL
    Body-parser
    Express-validator
    Jsonwebtoken

Features

    User authentication using JSON Web Tokens
    Product browsing and filtering
    Add to cart functionality
    Secure payment processing using Stripe
    Transaction history for users
    Admin functionality for adding and managing products

How to use

    Clone the repository
    Run `npm install` to install the dependencies
    Create a MySQL database and import the provided sql file
    Update the server.js file with your MySQL credentials and other configurations
    Run `npm start` to start the server
    Make sure to also run the client-side code (ex: React.js) or `npm start` in order to interact with the server

Note

    Make sure to have Node.js installed in your system
    This is the server side of the project make sure to also run client side in order to see the full functionality
    This server uses mysql as database, make sure you have mysql installed on your local machine
    Also make sure you have created the database and imported the sql file provided with the project
    You will also need to provide your stripe credentials in the env file to process the payments.

