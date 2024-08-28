  
const mysql = require('mysql');


// const dbConnPool = mysql.createPool({
//     connectionLimit: process.env.CONNECTION_LIMIT,    // the number of connections node.js will hold open to our database
//     password: process.env.DB_PASS,
//     user: process.env.DB_USER,
//     database: process.env.MYSQL_DB,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT
    
// });

var dbConnPool = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "jobportal",
    port: 3306
  });


module.exports = dbConnPool;