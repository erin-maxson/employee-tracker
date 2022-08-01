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

}