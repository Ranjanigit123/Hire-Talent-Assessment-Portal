require("dotenv").config();
const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require("mysql");

const apiRouter = require('./src/routes/loginuser.js');
    
const app = express();
const PORT= process.env.PORT;
    
app.use(bodyParser.json());
app.use(cors());
 
apiRouter.use(cookieParser());
 
app.use('/apiRouter',apiRouter)

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "jobportal",
});

db.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });
    
// A demo get route
app.get('/', (req, res) => {
    res.json({
        route: '/',
        authentication: false
    });
});

app.listen(PORT, ()=>{
    console.log(`server is listening  on ${PORT}`);
});

    
module.exports = app;