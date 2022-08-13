
const Sequelize = require('sequelize')

// Creating new Object of Sequelize
const sequelize = new Sequelize(
	'studentrecord',
	'root',
	'root', {
		dialect: 'mysql',	
		host: 'localhost',
		port:'3306'
	}
);

module.exports = sequelize;
