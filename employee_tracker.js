const mysql = require('mysql');
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Killabrew30",
    database: "employeeTracker_db"
});
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    questions();
});

function questions() {
    inquirer.prompt({
        message: "What action whould you like to take?",
        type: "list",
        choices: [
            "View All Employees",
            "View All Departments",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role",
            "Quit"
        ],
        name: "choice"
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "View All Employees":
                viewAllEmployees()
                break;
              
            case "View All Departments":
                viewAllDepartments()
                break; 
              
            case "Add Employee":
                addEmployee()
                break;  
                  
            case "Add Role":
                addRole()
                break;
                  
            case "Add Department":
                addDepartment()
                break;   
                  
            case "Update Employee Role":
                updateEmployeeRole()
                break;
                  
            default:
                connection.end()
                break;    
        }
    })
}

function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        questions();
    })
}

function viewAllDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        questions();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
        },
        {
            type: "number",
            name: "role_id",
            message: "What is the employee's role ID?"
        },
        {
            type: "number",
            name: "manager_id",
            message: "What is the employee's manager's ID?"
        }
    
    ]).then(function(res) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id VALUES (?,?,?,?)", [res.first_name, res.last_name, res.role_id, res.manager_id], function(err, data) {
            if (err) throw err;
            console.table("Employee Added");
            questions();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the title."
        },
        {
            type: "number",
            name: "salary",
            message: "Enter the salary."
        },
        {
            type: "number",
            name: "department_Id",
            message: "Enter the department ID."
        }

    ]).then(function(res) {
        connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)", [res.title, res.salary, res.department_id], function(err, data) {
            console.table(data);
        })
        questions();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Enter the name of the department."
        }
    ]).then(function(res) {
        connection.query("INSERT INTO department (name) VALUES (?)", [res.department], function(err,data) {
            if (err) throw err;
            console.table("Department Added");
            questions();
        })
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Which employee profile would you like to update? (Enter their first name)"
        },
        {
            type: "number",
            name: "role_id",
            message: "Enter the employee's new role ID"
        }
    ]).then(function(res) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.name, res.role_id], function(err,data) {
           console.table(data);
        })
        questions();
    })
}