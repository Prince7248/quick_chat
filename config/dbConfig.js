// const mongoose= require('mongoose');

// //connection logic
// mongoose.connect(process.env.CONN_STRING);

// //connection state
// const db = mongoose.connection;

// //check DB connection
// db.on('connected', ()=>{
//     console.log('DB Connection Sucessfull!');
// });
// db.on('err', ()=>{
//     console.log('DB Connection failed');
    
// });

// module.exports = db;

const mongoose = require('mongoose');
const dotenv = require('dotenv');


const connectDB= async()=>{
     try{
            await mongoose.connect('mongodb://localhost:27017/quick-chat')
            console.log(`MongoDB Connected ${mongoose.connection.host}`);
     }catch(error){
        console.log(`MongoDB Error ${error}`);
     }
}

module.exports = connectDB;