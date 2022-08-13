var express = require("express");
const ro = express.Router();
const teacherController = require('../Controller/teacherController');
ro.get("/viewallrecord",teacherController.teacherlogin);

ro.get('/addnewrecord',teacherController.addnewrecord);
ro.post('/addnewrecord',teacherController.addnewrecordpost);
ro.get('/delete/:rollno',teacherController.deletestudent);
ro.get('/edit/:rollno',teacherController.Updatestudentrecord);
ro.post('/edit/:previousrollno',teacherController.UpdatestudentrecordPost);
module.exports=ro;