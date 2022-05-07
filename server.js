const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");
//for connection
require('dotenv').config();


const connection = mysql.createConnection({
    host: "localhost",
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
});
  
