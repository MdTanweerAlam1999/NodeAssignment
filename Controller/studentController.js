const { response } = require("express");
const mysql = require("mysql2");
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_Pass,
    database: process.env.DB_NAME
});

exports.studentLoginGet = (req, res) => {
    res.render('student/login');
};
exports.studentLoginPost = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log("connect to database succesfully");
        const nameOfStudent = req.body.studentname;
        const rollOfStudent = req.body.roll;
        connection.query('select * from studenttables where rollno=? and name=?',[rollOfStudent,nameOfStudent], (err, results) => {
        if(results.length>0){
           res.render('student/resultview',{
               results
           });
        }
        else{
            res.render('student/login',{
                error:"Incorrect name or roll number",
            })
        }
        });
    });
};