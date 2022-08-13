
const sequelize = require('./config/database');
	
// Import the user model we have defined
const studentTable= require('./models/student');
sequelize.sync({force:true}).then((result)=>{
    console.log("table created successfully");
}).catch(err=>{
    console.log(err);
});
	
