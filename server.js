// const dotenv = require('dotenv');
// dotenv.config({path: './config.env'});

const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConfig');

// const dbconfig = require('./config/dbConfig');

const app = require('./app');

// database connect
connectDB();

// const port = process.env.PORT_NUMBER || 8001;
const port = 8001;

app.listen(port,() =>{
    console.log('Listening to request on PORT:' + port);
} );