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
viewAllEmployees = () => {
  console.log("=================Employees below================");
  const sql =  'SELECT CONCAT(employees.first_name," ", employees.last_name) AS "Employee", roles.title AS Role, roles.salary AS Salary, departments.name AS Department FROM employees RIGHT JOIN roles ON employees.role_id = roles.id RIGHT JOIN departments ON departments.id = roles.department_id ORDER BY department_id';
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);

  });
}
//  add a department
//  add a role
//  add an employee
//   update an employee role






















//module.exports = {all the functions created in this file}