const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
// Middleware
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
                if (err) throw err;
                res.json({message: 'Admin added successfully'});
            });
        }
    })
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const sql = 'SELECT * FROM adminDetails WHERE email =? AND password =?';
    db.query(sql,[email,password], (err, result) => {
        if (err) throw err;
        else if(result.length > 0) {
            res.send('Login successful');
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