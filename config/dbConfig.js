const mongoose= require('mongoose');

//connection logic
mongoose.connect(process.env.CONN_STRING);

//connection state
const db = mongoose.connection;

//check DB connection
db.on('connected', ()=>{
    console.log('DB Connection Sucessfull!');
});
db.on('err', ()=>{
    console.log('DB Connection failed');
    
});

module.exports = db;