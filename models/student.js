// Include Sequelize module.
const Sequelize = require('sequelize');

// Import sequelize object,present 
// in the config folder 
const sequelize = require('../config/database');

const studentTable = sequelize.define('studentTable', {
	rollno:{
		type:Sequelize.INTEGER,
		allowNull:false,
		primaryKey:true
	},
	name: { type: Sequelize.STRING, allowNull:false },

	dob: { type: Sequelize.STRING, allowNull:false },
	score:Sequelize.STRING,
},{
	timestamps : false
});
module.exports = studentTable;
