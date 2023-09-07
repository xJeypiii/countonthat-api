require('dotenv').config();

const express = require('express');
const cors = require('cors');
const passport = require("passport");
const path = require("path");

let PORT = process.env.PORT || 5000;

//=== 1 - CREATE APP
// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(cors());

// for parsing application/json
app.use(express.json());

// for parsing application/xwww-
app.use(express.urlencoded({ extended: false }));
//form-urlencoded

//=== 2 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("./middlewares/strategies")(passport);

//=== 3 - CONFIGURE ROUTES
//Configure Route
require('./routes/index')(app);

//=== 4 - START SERVER
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT + '/'));
