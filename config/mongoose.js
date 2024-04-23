const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codemeia121');

const db = mongoose.connection;

db.on("error",console.error.bind(console,'error'));
db.once('open',function(){
    console.log('connecte to :: mongo db')
});

module.exports = db ;
