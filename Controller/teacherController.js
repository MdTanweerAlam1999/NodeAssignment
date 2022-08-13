const { response } = require("express");
const mysql = require("mysql2");
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_Pass,
    database: process.env.DB_NAME
});

exports.teacherlogin = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('select * from studenttables', (err, results) => {
            if (results.length > 0) {
                res.render('teacher/viewallstudents', {
                    lenghtrecord: results.length,
                    results,
                    rendertable:true,
                });
            }
            else {
                res.render('teacher/viewallstudents', {
                    lenghtrecord: results.length,
                    error: 'Nothing to display',
                    rendertable:false,
                });
            }
        });
    });
}
exports.addnewrecord = (req, res) => {
    res.render('teacher/addnewrecord');
};
exports.addnewrecordpost = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('insert into studenttables values(?,?,?,?)', [req.body.roll, req.body.name, req.body.dob, req.body.score], (err, result) => {
            if (err) throw err;

            connection.query('select * from studenttables', (err, results) => {
                if (results.length > 0) {
                    res.render('teacher/viewallstudents', {
                        lenghtrecord: results.length,
                        results,
                        rendertable:true,
                    });
                }
                else {
                    res.render('teacher/viewallstudents', {
                        error: 'Nothing to display',
                        lenghtrecord: results.length,
                        rendertable:false,
                    })
                }
            });

        });

    });

};
exports.deletestudent = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('delete from studenttables where rollno =?', [req.params.rollno], (err, result) => {
            if (err) throw err;
            connection.query('select * from studenttables', (err, results) => {
                if (results.length > 0) {
                    res.render('teacher/viewallstudents', {
                        lenghtrecord: results.length,
                        results,
                        rendertable:true,
                    });
                }
                else {
                    res.render('teacher/viewallstudents', {
                        error: 'Nothing to display',
                        lenghtrecord: results.length,
                        rendertable:false,
                    })
                }
            });

        });
    });
    //console.log(req.params.rollno);   
}
exports.Updatestudentrecord = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query('select * from studenttables where rollno =?', [req.params.rollno], (err, results) => {
            if (results.length > 0) {
                res.render('teacher/editrecord', {
                    previousrollno: req.params.rollno,
                    results
                    
                });
            }
            else {
                res.render('teacher/viewallstudents',{
                    lenghtrecord: results.length,
                    results,
                    rendertable:true,
                });
            }
        });
    });
    //res.render('teacher/editrecord');
}
exports.UpdatestudentrecordPost = (req, res) => {
    if (req.params.previousrollno == req.body.roll) {
        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query('update studenttables set rollno =?,name=?,score=?,dob=? where rollno=?', [req.body.roll, req.body.name, req.body.score, req.body.dob,req.body.roll], (err, results) => {
                if (err) throw err;
                connection.query('select * from studenttables',(err, results) => {
                    if (results.length > 0) {
                        res.render('teacher/viewallstudents', {
                            lenghtrecord:results.length,
                            results,
                            rendertable:true,
                        });
                    }
                    else {
                        res.render('teacher/viewallstudents');
                    }
                });
            });
        });
    }
    else {
        var check = true;
        pool.getConnection((err, connection) => {
            connection.query('select * from studenttables where rollno=?', [req.body.roll], (err, result) => {
                if (result.length == 0) {
                    connection.query('update studenttables set rollno =?,name=?,score=?,dob=? where rollno=?', [req.body.roll, req.body.name, req.body.score, req.body.dob,req.params.previousrollno], (err, results) => {
                        if (err) throw err;
                        connection.query('select * from studenttables',(err, results) => {
                            if (results.length > 0) {
                                res.render('teacher/viewallstudents', {
                                    lenghtrecord:results.length,
                                    results,
                                    rendertable:true,
                                });
                            }
                            else {
                                res.render('teacher/viewallstudents');
                            }
                        });
                    });
                }
                else{
                    pool.getConnection((err, connection) => {
                        if (err) throw err;
                        connection.query('select * from studenttables where rollno =?', [req.params.previousrollno], (err, results) => {
                            if (results.length > 0) {
                                res.render('teacher/editrecord', {
                                    previousrollno: req.params.rollno,
                                    results,
                                    error:"Roll number already exits"
                                });
                            }
                            else {
                                res.render('teacher/viewallstudents');
                            }
                        });
                    }); 
                }
            });
        });
    }
    //console.log(req.params.previousrollno);
};