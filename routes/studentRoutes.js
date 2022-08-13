var express = require("express");
// ro means router object
const ro = express.Router();
const studentController = require('../Controller/studentController');
ro.get('/login',studentController.studentLoginGet);
ro.post('/login',studentController.studentLoginPost);
module.exports = ro;