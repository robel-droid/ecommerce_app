const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require('mysql2');
const multer = require('multer');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("upload"));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommercedb'
});

// connect to database
db.connect((err) => {
    if (err) {
       console.log(err);
    } else {
      console.log('MySQL connected');
    }
});

// create route for signup
app.post('/snup', (req, res) => {
// get user input from the request body
    const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    phone: req.body.phone
};

// create SQL statement to insert user data into the database
let sql = "INSERT INTO customers SET ?";
db.query(sql, user, (err, result) => {
  if (err) {
    console.log(err);
    res.send({status: 'error'});
  } else {
    console.log(result);
    res.send({status: 'success'});
  }
});
});


app.use(cookieParser());
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
//create route for login
app.post('/lgn', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  let sql = `SELECT * FROM customers WHERE email = '${email}' AND password = '${password}'`;
  db.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          res.send({status: 'error'});
      } else if(result.length > 0) {
          req.session.user = result[0];
          req.session.loggedIn = true;
          res.send({status: 'success', user: result[0]});
      } else {
          res.send({status: 'error', message: 'Invalid email or password'});
      }
  });
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'upload/')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
  }
});
const upload = multer({ storage: storage });

app.post('/add', upload.single('image'), (req, res) => {
  const product = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file.filename,
      quantity: req.body.quantity
  };

  let sql = "INSERT INTO products SET ?";
  db.query(sql, product, (err, result) => {
      if (err) {
          console.log(err);
          res.send({ status: 'error' });
      } else {
          res.send({ status: 'success' });
      }
  });
});
app.get('/searchProducts', (req, res) => {
  const search = req.query.search;
  let sql = `SELECT * FROM products WHERE name LIKE '%${search}%' OR description LIKE '%${search}%'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.send({status: 'error'});  
    } else {
      res.send({status: 'success', products: result});
    }
  });
});
app.get('/products', (req, res) => {
    const search = req.query.search;
    let sql = `SELECT * FROM products`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.send({status:'error'});
      } else {
        res.send({status: 'success', products: result});
      }
    });
});
app.get('/image/:id', (req, res) => {
  const id = req.params.id;
  let sql = `SELECT image FROM products WHERE id = ${id}`;
  db.query(sql, (err, result) => {
      if (err) {
          console.log(err);
          res.send({status: 'error'});
      } else {
        const image = result[0].image;
        const imageBuffer = new Buffer.from(image, 'binary');
        res.set('Content-Type', 'image/png');
        res.send(imageBuffer);
      }
  });
});

//checkout 
app.post('/checkout', (req, res) => {
  const order = {
    customer_id: req.body.customer_id,
    total: req.body.total,
    date: new Date()
  };
  let sql = "INSERT INTO orders SET ?";
  db.query(sql, order, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ status: 'error' });
    } else {
      const order_id = result.insertId;
      req.body.products.forEach(product => {
        let sql = "INSERT INTO order_items SET ?";
        const order_item = {
          order_id: order_id,
          product_id: product.id,
          quantity: product.quantity,
          price: product.price
        };
        db.query(sql, order_item, (err, result) => {
          if (err) {
            console.log(err);
            res.send({ status: 'error' });
          }
        });  
         sql = "UPDATE products SET quantity = quantity - ? WHERE id = ?";
        db.query(sql, [product.quantity, product.id], (err, result) => {
          if (err) {
            console.log(err);
            res.send({ status: 'error' });
          }
        });
     
      });
      res.send({ status: 'success' });
      
    }
  });
});app.get('/transactions', (req, res) => {
  const customer_id = req.query.customer_id;
  let sql = `SELECT orders.id, date,total FROM orders WHERE customer_id=${customer_id};`
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({status: 'error', message: 'Error fetching transaction data'});  
    } else {
      let transactions = result.map(transaction => {
        return {
          id: transaction.id,
          date: transaction.date,
          total: transaction.total,
          products: []
        }
      });
      let transactionIds = transactions.map(transaction => transaction.id);
      let placeholders = transactionIds.map(() => '?').join(',');
      sql = `SELECT order_items.order_id, products.name FROM order_items INNER JOIN products ON order_items.product_id = products.id WHERE order_items.order_id IN (${placeholders});`
      db.query(sql, transactionIds, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send({status: 'error', message: 'Error fetching transaction data'});  
        } else {
          result.forEach(item => {
            let transaction = transactions.find(transaction => transaction.id === item.order_id);
            transaction.products.push(item.name);
          });
          res.send({status: 'success', transactions});
        }
      });
    }
  });
});
  
app.listen(PORT, () => {
console.log(`Server started on port ${PORT}`);
});