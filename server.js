const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");
//for connection
require('dotenv').config();

const {  
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addADepartment,
  addARole,
  addEmployee,

} = require('./lib/function');

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
    userPrompt();
});

//questions

const userPrompt = () => {
  console.log(
    "🅆🄴🄻🄲🄾🄼🄴 🅃🄾 🅃🄷🄴 🄴🄼🄿🄻🄾🅈🄴🄴 🅃🅁🄰🄲🄺🄴🅁"

    
  );
  inquirer
    .prompt([
      {
        type: "list",
        name: "questions",
        message: "What would you like to do?",
        choices: [
          "View all Departments",
          "Add a Department",
          "View all Roles",
          "Add a Role",
          "View all Employees",
          "Add an Employee", //need to add 
          "Update Employee role",//need to add
          "Exit Employee Tracker",
        ],
        loop: false,
        pageSize: 15,
      },
    ])
    .then((answers) => {
      options = answers.questions;

      if (options === "View all Departments") {
        viewAllDepartments();
       setTimeout(function() {userPrompt();}, 3000);
      }
      if (options === "Add a Department") {
        addADepartment();
        setTimeout(function() {userPrompt();}, 3000);
      }


      if (options === "View all Roles") {
        viewAllRoles();
        setTimeout(function() {userPrompt();}, 3000);
      }

      if (options === "Add a Role") {
        addARole();
        console.log("Please For Menu to appear")
        setTimeout(function() {userPrompt();}, 20000);
      }

      if (options === "View all Employees") {
        viewAllEmployees();
        setTimeout(function() {userPrompt();}, 3000);
      }
      if (options === "Add an Employee") {
        addEmployee();
        console.log("Please wait for Menu to appear")
        setTimeout(function() {userPrompt();}, 20000);
      }

      if (options === "Exit Employee Tracker") {
        console.log("BYE!!")
        console.log("press ctrl C to end")
        connection.break; //not sure yet y it does not break and exit 
      }
    });
};

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
  
//use prompts to ask questions 

//create difference functions that execute different commands 
//each function will follow the acceptance criteria description 
//combine all functions in the promptuser function that will present the options adn output to user 


