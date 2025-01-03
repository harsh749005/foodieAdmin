const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const cookie = require('cookie-parser');
const multer = require("multer");
const path = require("path");
const { error } = require('console');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname, 'uploads'));
    },
    filename:(req,file,cb)=>{
        const str = file.originalname;
        const result = str.replace(/\.(jpg|jpeg|png|gif)$/, "");
        cb(null, result + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage });
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
    console.log("Token : "+token);
    if (!token) {
      return res.status(401).json({ message: "Token is not provided" });
    } else {
      jwt.verify(token, "1234", (err, decoded) => {
        if (err) {
          return res.json({ Error: "Token is not same" });
        } else {
          req.email = decoded.email;
          next();
        }
      });
    }
  };
  app.get('/', verifyUser, (req, res) => {
    res.send(`Hello ${req.email}!`);
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
                const token = jwt.sign({email},"1234",{expiresIn:"1d"});
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
            const token = jwt.sign({email},"1234",{expiresIn:"1d"});
            res.cookie('token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Ensure it's true in production with HTTPS
                maxAge: 24 * 60 * 1000,
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

app.post('/addItem',upload.single("foodImage"), (req, res) => {
    const {foodName,foodPrice,foodDescription,foodCategory} = req.body;
    const foodImage = req.file ? req.file.filename : null;
    const sql = 'INSERT INTO fooditem (	`foodName`, `foodPrice`, `foodDescription`, `foodImage`,`foodCategory`) VALUES(?,?,?,?,?)';
    db.query(sql, [foodName, foodPrice, foodDescription, foodImage,foodCategory],(err,result)=>{
        if(err) throw err;
        return res.json({message: 'Product added successfully'});
    })
    
})


const port = 8081;
app.listen(port,(req,res)=>{
    console.log(`Server is running on http://localhost:${port}`);
})