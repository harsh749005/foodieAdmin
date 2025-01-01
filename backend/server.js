const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

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
app.post('/insertAD', (req, res) => {
    const {name,email,password} = req.body;
    const sql = 'INSERT INTO adminDetails (name,email,password) VALUES(?,?,?)';
    db.query(sql,[name,email,password], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Failed to add admin',
                error: err.message
            })
        };
        res.send({
            success: true,
            message: 'Admin added successfully',
            id: result.insertId
        });
    });
})

app.get('/fetchAD', (req, res) => {
    db.query('SELECT * FROM adminDetails', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
})

app.get('/', (req, res) => {
    res.send('Hello from Foodie Server');
})
const port = 8081;
app.listen(port,(req,res)=>{
    console.log(`Server is running on http://localhost:${port}`);
})