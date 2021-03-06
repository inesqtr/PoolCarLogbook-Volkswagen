const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const cors = require('cors');

const app = express();

// config db
require('./db/config');

// view engine setup
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// implement the API part
app.get("/", (req, res) => {
    res.send("youhou");
})

app.use('/', indexRouter);



/// in case path is not found, return the 'Not Found' 404 code
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});



module.exports = app;
