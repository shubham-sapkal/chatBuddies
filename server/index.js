const express = require('express');
const cors = require('cors');

const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5000;

// call enviroment 
require('dotenv').config();

// middleware
app.use(cors());

app.use(express.json());

app.use(express.urlencoded());


// Route
app.get('/', (req, res) => {
    // res.header( "Access-Control-Allow-Origin" );
    res.send('Hello, World!');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));