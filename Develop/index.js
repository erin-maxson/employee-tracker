const inquirer=require("inquirer")
const db = require("./config/connection")

db.connect( ()=> {
    menu()
})

const menuQuestion = [
    {
    type:"list",
    name:"menu",
    message:"Choose the following options:",
    choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role"]
    }
]

const employeeAddQuestions = [
    {
        type:"input",
        name:"first_name",
        message:"Please provide the first name of the employee."

    }
]

function menu(){
    inquirer.prompt(menuQuestion)
    .then(response=>{
        if(response.menu==="View All Employees"){
            viewEmployees()
        }
        else if(response.menu==="Add Employee"){
            addEmployee()
        }
    })
}

function viewEmployees(){
    db.query(`SELECT 
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    department.name as department,
    role.salary,
    CONCAT(mgr.first_name, " " , mgr.last_name) as manager
    FROM employee
    LEFT JOIN role ON role.id= employee.role_id
    LEFT JOIN department ON role.department_id=department.id
    LEFT JOIN employee as mgr ON employee.id =  mgr.manager_id`, (err,data)=>{
        console.table(data)
    })
}

function addEmployee(){
    db.query("Select title as name, id as value from role", (err, roleData)=>{
    db.query(`CONCATfirst_name, " " , last_name) as name, id as value from employee where manager_id is null`)
    })
}