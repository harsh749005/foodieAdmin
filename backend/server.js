const mysql = require('mysql');
const express = require('express');
const app = express();

// Middleware
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
        if (err) throw err;
        res.send('Admin inserted successfully');
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
app.listen(3000,(req,res)=>{
    console.log(`Server is running on http://localhost:${3000}`);
})