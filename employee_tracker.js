const mysql = require('mysql');
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Duke2017###",
    database: "employeeTracker_db"
});
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
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

}

function viewAllDepartments() {

}

function addEmployee() {

}

function addRole() {

}

function addDepartment() {

}

function updateEmployeeRole() {

}