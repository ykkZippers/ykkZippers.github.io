// Setting up Express, CORS, Mongoose, and dotenv
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// allow environment variables to be in .env file
require("dotenv").config();

// create express server
const app = express();
const port = process.env.PORT || 5000;  // set server to run from localhost: 5000

// setup cors middleware
// allow server to parse json
app.use(cors());
app.use(express.json());

//connect MongoDB database with mongoose
//notice the mongoose.connection() options
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);
const connection = mongoose.connection;
// once connection has been made, print "Mongo DB database connection established successfully"
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const countersRouter = require('./routes/counters');

// URL appends "/counters" to do stuff with counters
// URL appends "/users" to do stuff with users
app.use('/counters', countersRouter);

//start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});