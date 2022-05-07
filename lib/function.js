const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");

//view all departments
viewAllDepartments = () => {
    console.log("=================Departments below===================");
    const sql = 'SELECT name AS department FROM departments';
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);

      });
    
};
viewAllRoles = () => {
  console.log("=================Roles below===================");
  const sql = 'SELECT roles.title AS Role, roles.salary as Salary, departments.name AS Department FROM roles LEFT JOIN departments ON roles.department_id = departments.id';
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

  });
};
//  view all employees
//  add a department
//  add a role
//  add an employee
//   update an employee role






















//module.exports = {all the functions created in this file}