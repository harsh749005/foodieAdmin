const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const cookie = require('cookie-parser');
// Middleware
app.use(cookie());
app.use( cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST","DELETE"],
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Database connection

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'foodie'
});


db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token is not provided" });
    } else {
      jwt.verify(token, "1234", (err, decoded) => {
        if (err) {
          return res.json({ Error: "Token is not okay" });
        } else {
          req.email = decoded.email;
          next();
        }
      });
    }
  };
  app.get('/', verifyUser, (req, res) => {
    res.send(`success ${req.email}!`);
  });

// API endpoints
app.post('/register', (req, res) => {
    const {name,email,password} = req.body;
    const sql = 'SELECT * FROM adminDetails WHERE email = ? AND password = ?';
    db.query(sql,[email,password],(err, result) => {
        if (err) throw err;
        if(result.length > 0){
            res.send( 'Admin already exists');
        }else{
            
            const sql = 'INSERT INTO adminDetails (name, email, password) VALUES(?,?,?)';
            db.query(sql,[name,email,password],(err, result) => {
                const token = jwt.sign({email},"1234",{expiresIn:"1h"});
            res.cookie('token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Ensure it's true in production with HTTPS
                maxAge: 24 * 60 * 60 * 1000,
                path: "/", // Ensure the cookie is available for all paths
                domain: "localhost",
            });      
                if (err) throw err;
                res.json({message: 'Admin added successfully',token: token});
            });
        }
    })
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const sql = 'SELECT * FROM adminDetails WHERE email =? AND password =?';
    db.query(sql,[email,password], (err, result) => {
        if (err) throw err;
        if(result.length > 0) {
            const token = jwt.sign({email},"1234",{expiresIn:"1h"});
            res.cookie('token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Ensure it's true in production with HTTPS
                maxAge: 60 * 1000,
                path: "/", // Ensure the cookie is available for all paths
                domain: "localhost",
            });      
            return res.json({message: 'Login successful'});
        }
        else {
            res.send('Invalid credentials');
        }
        
    });
})

app.get('/', (req, res) => {
    res.send('Hello from Foodie Server');
})
const port = 8081;
app.listen(port,(req,res)=>{
    console.log(`Server is running on http://localhost:${port}`);
})