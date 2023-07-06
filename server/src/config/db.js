const mysql = require('mysql');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

var con = mysql.createConnection({
  host:process.env.host,
  user:process.env.user,
  password:process.env.password,
  port:process.env.port,
  database:process.env.database,
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected with MySQL database!");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected with MongoDB database");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

module.exports = con;
