const express = require('express');
const app = express();
const path = require('path');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/task');
//require('dotenv').config;

app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Parse application/json
app.use(bodyParser.json());

// Set ejs templete engine
// app.set('view engine', 'ejs');

app.use('/home', router);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'task.html'));
})

// mongoose.connect(process.env.MONGODB_URI).then(() => {
//     console.log("mongodb connected!");
//     app.listen(3000);
// }).catch(err => console.log(err));
app.listen(3000, console.log("App is running on port: 3000"));


