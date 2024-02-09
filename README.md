Ecommerce App
#Introduction
This project is an e-commerce platform that allows users to browse, purchase, and manage products. It is built using React, a JavaScript library for building user interfaces, and the React Router library for client-side routing. The architecture is based on components, where each component represents a specific feature or functionality of the application. We also used HTML, CSS, and JavaScript for styling and interactivity. Additionally, we used the Redux library for state management, and MySql database for data storage. Overall, this project demonstrates a solid understanding of modern web development technologies and best practices.

Project Setup

    Before starting the project, open the SQL folder and import the eccomerce.sql file into your MySQL database.
    Once the database has been created successfully, navigate to the root directory of the project and run npm install to install the necessary packages for the client-side.
    To start the client-side app, run npm start.

Server-side Scripts

    Navigate to the ./server directory.
    Run npm install to install the necessary packages for the server-side.
    To start the server-side script, run node ./server.js.
    To modify the database connection or change login credentials, open the server.js file.
    Update the following lines with your connection details:

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ecommercedb'
    });

OR open screenshots folder and see the screen shots in there starting from Screenshot (34).png    

Functionalities and Components

    1.Login
    2.Signup
    3.Logout
    4.AddProduct
    5.BrowseProduct
    6.SearchProduct
    7.AddToCart
    8.Cart (viewCart)
    9.Checkout
    10.TransactionHistory	

