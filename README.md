Ecommerce App
Project Setup

    Before starting the project, open the SQL folder and import the eccomerce.sql file into your MySQL database.
    Once the database has been created successfully, navigate to the root directory of the project and run npm install to install the necessary packages for the client-side.
    To start the client-side app, run npm start.

Server-side Scripts

    Navigate to the ./server directory.
    Run npm install to install the necessary packages for the server-side.
    To start the server-side script, run node ./server.js.
    To modify the database connection or change login credentials, open the server.js file.
    U

    pdate the following lines with your connection details:

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommercedb'
});
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

=========================
Section: N3
Project group memmbers:
   1.ROBEL MAMO(UU78895R)
   2.TSION TEFERI(UU78754R)
   3.HILAWI MEAZA(UU78760R)
   4.NATNAEL MESFIN(UU79037R)
   5.HEAVEN TEAME(UU80270R)
   6.YARED SHIFERAW(UU78815R)
   7.MICHAEL MARYE(UU79068)
