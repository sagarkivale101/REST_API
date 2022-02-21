


const mongoose = require('mongoose');
function connectDB() {
    // Database connection 🥳
    mongoose.connect("mongodb+srv://sagark101:samkiwale@cluster0.x9vnv.mongodb.net/inshare?retryWrites=true&w=majority")
  //  console.log(process.env.MONGO_CONNECTION_URL);
    //mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('Database connected 🥳🥳🥳🥳');
    }).on('error', function (err) {
        console.log(err);
      });
}



// mIAY0a6u1ByJsWWZ

module.exports = connectDB;

















// const mongoose = require('mongoose')


// const mongoDB = 'mongodb://0.0.0.0:27017/emp_api'
// var dbConnect = async () => {
    
//     try {

// await mongoose.connect(mongoDB, {useNewUrlParser:true, useUnifiedTopology:true})

// const db = mongoose.connection;
//     } catch (err) {
//     //db.on('error',  console.error.bind(console, 'MONGODB error'));
//     console.log('Error at dbConnect:=>', err)
//     throw err;
// }}
// module.exports = dbConnect;