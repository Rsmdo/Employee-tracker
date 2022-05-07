const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");
//for connection
require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
});
  
  connection.connect((error) => {
    if (error) {
      console.log("Did not connect to Database");
      return;
    }
    console.log("\nConnected to Database\n");
    //add function to execute when server starts 
});

//first question should be given options 
//each will have its own function 

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
  
//use prompts to ask questions 

//create difference functions that execute different commands 
//each function will follow the acceptance criteria description 
//combine all functions in the promptuser function that will present the options adn output to user 
