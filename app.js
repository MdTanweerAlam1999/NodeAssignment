const express = require("express");
const hbs = require("hbs")
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const path = require("path");
const { throws } = require("assert");
require("dotenv").config();
const app = express();
app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(express.static(path.resolve(__dirname,"./public")));
//app.engine('hbs',exphbs({extname:'.hbs'}));
app.set('view engine','hbs');

const port = 8006;

const pool = mysql.createPool({
    connectionLimit:100,
    host           :process.env.DB_HOST,
    user           :process.env.DB_USER,
    password       :process.env.DB_Pass,
    database       :process.env.DB_NAME
});
pool.getConnection((err,connection)=>{
    if(err) throw err;
     console.log('connected as ID '+ connection.threadId);
});

const studRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const partialRoute = path.join(__dirname, "./views/layouts");
app.use("/teacher",teacherRoutes);
app.use("/student",studRoutes);
hbs.registerPartials(partialRoute);
app.get("/",(req,res)=>{
    res.render('home');
});
app.listen(port,()=>{
    console.log(`listening to the port ${port}.`);
});
