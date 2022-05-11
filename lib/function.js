const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require("inquirer");
const userPrompt = require('../server');


//added connection here to since it does not carry over 
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

});

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
    // userPrompt();

  });
};
viewAllEmployees = () => {
  console.log("=================Employees below================");
  const sql =  'SELECT CONCAT(employees.first_name," ", employees.last_name) AS "Employee", roles.title AS Role, roles.salary AS Salary, departments.name AS Department FROM employees RIGHT JOIN roles ON employees.role_id = roles.id RIGHT JOIN departments ON departments.id = roles.department_id ORDER BY department_id';
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    // userPrompt();

  });
}
//  add a department

addADepartment =() => {
  return inquirer.prompt([
  {
    type: "input",
    name: "addDeptartment",
    message: "(REQUIRED) What department would you like to add?",
    validate: (input) => {
      if (input) {
        return true;
      } else {
        console.log("Please Enter a Department");
        return false;
      }
    },
  },
 ])
  .then(({ addDeptartment }) => {
    const sql = `INSERT INTO departments (name) VALUES (?)`; // inserts into departments table
    const params = [addDeptartment];
    connection.query(sql, params, (err, rows) => {
      if (err) throw err;
      console.log('Department has been added! Press the view all departments to view it');
    });
    // userPrompt();
  });
  

};


//  add a role

addARole =() => {
  const sql = `SELECT departments.name FROM departments`; //use same format as add departments neeed  to select data from department and role
  connection.query(sql, (err, rows) => {
    if (err) throw err;
    inquirer 
      .prompt([
        {
          type: "input",
          name: "role",
          message: "(REQUIRED) What is the Role??",
          validate: (input) => {
            if (input) {
              return true;
            } else {
              console.log("Enter a Role");
              return false;
            } //add this to roles table 
          },
        },
        {
          type: "number",
          name: "salary",
          message: "What is the salary of the role?",
        }, //add this to roles table 
        {
          type: "list",
          name: "deptartmentName",
          message: "What department does this role fall under?",
          choices: rows,
          loop: false,
        }, //add this to departments table 
      ])

      .then(({ role, salary, deptartmentName }) => {
        const addARole = function(roletitle, rolesalary, roledeptID) {
          const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`; //use ? so it can be changed rather than hardcoded 
          const params = [roletitle, rolesalary, roledeptID];

          connection.query(sql, params, (err) => {
            if (err) throw err;
            console.log('Role has been added to the database');
          });
        };
  
        const addToDept = function (role, salary, deptartmentName) {
          const sql = `SELECT departments.id FROM departments WHERE departments.name = "${deptartmentName}"`; 
          //hopfully it selects the right department based on the user input then adds it under there by using the addarole
          connection.query(sql, (err, rows) => {
            if (err) throw err;
            //using add a role since it works better then executing solo then joining
            //nesting into this function works better
            addARole(role, salary, rows[0].id);
          });
        };
        //lastly call to execute
        addToDept(role, salary, deptartmentName);
      });
      // userPrompt();
  });
}
//  add an employee
const addEmployee = () => {
    //information 
    const sql = `SELECT r.id, r.title, r.salary FROM roles r`;
    connection.query(sql, function (err, res) {
      if (err) throw err; 
      const choices = res.map(({id, title, salary }) => ({//map function with params needed 
        value: id, title: `${title}`, salary: `${salary}`
      }));
      console.table(res)//showing the response
      addEmployeeformat(choices) //another function that uses information from here
    });
  

}
const addEmployeeformat =(choices) => {
  inquirer.prompt([//first get information needed then format 
    {
      type: 'input',
      name: 'first_name',
      message: "(REQUIRED)What is your employee's first name?",
      validate: input => {
        if (input) {
            return true;
        } else {
            console.log("Please enter employee's first name");
            return false;
        }
      }
    },
    {
      type: 'input',
      name: 'last_name',
      message: "What is your employee's last name?",
      validate: input => {
        if (input) {
            return true;
        } else {
            console.log("Please enter employee's last name");
            return false;
        }//go in order from name -> role -> manager
      }
    }, 
    {
      type: "list",
      name: "roleId",
      message: "Which role will this employee be doing?",
      choices: choices
    },
    {
      type: "list",
      name: "managerId",
      message: "What is the ID of this employees manager?", 
      choices: ['1', '2', '3', '4','5','6']
    },
  ])
  .then(function (answer) {
    //to take resonse and add into the employee table 
    var sql = `INSERT INTO employees SET ?`

    connection.query(sql,
      {
        //proper formating and referencing in sql 
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.roleId,
        manager_id: answer.managerId,
      },
      function (err, res) {
        if (err) throw err;
        console.log("Employee sucessfully added");
        console.log("", 

        "");
        console.log("Find New employee in Table ")
        viewAllEmployees();
      });
  });

}



    
 


module.exports = {
  viewAllDepartments,
  viewAllRoles,
  viewAllEmployees,
  addADepartment,
  addARole,
  addEmployee,
};