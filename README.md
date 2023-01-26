#ecommerce_app project with react
#First commit with project
Before starting the project open the SQL folder and import the eccomerce.sql File in your mysql database
once the database has been created successfully 
...

To install packages for client-side
 `npm install` 
To start `npm start`

For Server side script
on .\server\ direcorty 
`npm install`
to start server side script
node ./server.js

to modify the database connection or to change login credentials
open server.js file 
change this lines :
...
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommercedb'
});
...
If the server has started successfuly it will show this message in the terminal 

> y@1.0.0 start
> node ./server.js

Server started on port 3001
MySQL connected


next step start client side app
`npm start` 


