const inquirer=require("inquirer")
const db = require("./config/connection")

require("console.table")

db.connect( ()=>{
    menu()
});
/*
view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role

*/ 
const menuQuestion=[
    {
        type:"list",
        name:"menu",
        message:"choose the following option:",
        choices:["View all departments","View all roles","View all employees","Add a department","Add a role","Add an employee","Update an employee role"]
    }
]

// menu prompts
function menu(){
  inquirer.prompt(menuQuestion)
  .then(response=>{
    if(response.menu==="View all employees"){
        viewEmployees()
    }
    else if(response.menu==="View all departments"){
        viewDepartments()
    }
    else if(response.menu==="View all roles"){
        viewRoles()
    }
    else if(response.menu==="Add an employee"){
        addEmployees()
    }
    else if(response.menu==="Add a department"){
        addDepartment()
    }
    else if(response.menu==="Add a role"){
        addRole()
    }
    else if(response.menu==="Update an employee role"){
        updateRole()
    }

  })
    
}

// allows you to view employees that are listed
function viewEmployees() {
    db.query("select* from employee", (err, data)=>{
        console.table(data)
        menu()
    })
}

// allows you to view the departments that are listed
function viewDepartments(){
    db.query("select* from department", (err, data)=>{
        console.table(data)
        menu()
    })
}

// allows you to view all roles that are listed
function viewRoles() {
    db.query("select* from role", (err, data)=>{
        console.table(data)
        menu()
    })
}


// allows you to add a new employee and their information
function addEmployees(){
    db.query("select title as name, id as value from role", (er, roleData)=>{

           db.query(`select CONCAT(first_name, " " , last_name) as name,  id as value from employee where  manager_id is null `, (err, managerData)=>{
            const employeeAddQuestions=[
                {
                    type:"input",
                    name:"first_name",
                    message:"What is your first name?",
            
                },
                {
                    type:"input",
                    name:"last_name",
                    message:"What is your last name?",
            
                },
                {
                    type:"list",
                    name:"role_id",
                    message:"Choose a role title.",
                    choices: roleData
                },{
                    type:"list",
                    name:"manager_id",
                    message:"Choose a manager.",
                    choices: managerData
                }
            
            ]
            //ensures that you have all parameters met and then inserts the employee info into the employee table
            inquirer.prompt(employeeAddQuestions).then(response=>{
                const parameters=[response.first_name,response.last_name,response.role_id, response.manager_id]
                db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id)VALUES(?,?,?,?)",parameters,(err, data)=>{

                    viewEmployees()
                })
            })
           })
    })
}

// allows you to add a new employee and their information
function addDepartment(){
    db.query("select title as name, id as value from role", (err, roleData)=>{

           db.query(`select CONCAT(first_name, " " , last_name) as name,  id as value from employee where  manager_id is null `, (err, managerData)=>{
            const employeeAddQuestions=[
                {
                    type:"input",
                    name:"department_name",
                    message:"What is the name of the department you'd like to add?",
            
                }
            
            ]
            //ensures that you have all parameters met and then inserts the employee info into the employee table
            inquirer.prompt(employeeAddQuestions).then(response=>{
                const parameters=[response.department_name]
                db.query("INSERT INTO department (name)VALUES(?)",parameters,(err, data)=>{

                    viewDepartments()
                })
            })
           })
    })
}


//adding roles
function addRole(){
    db.query("select title as name, id as value from role", (err, roleData)=>{

           db.query(`select CONCAT(first_name, " " , last_name) as name,  id as value from employee where  manager_id is null `, (err, managerData)=>{
            const employeeAddQuestions=[
                {
                    type:"input",
                    name:"title",
                    message:"What is the name of the role you'd like to add?",
            
                },
                {
                    type:"input",
                    name:"salary",
                    message:"What is the salary for this role?",
            
                },
                {
                    type:"list",
                    name:"role_department",
                    message:"What department does this role belong to?",
                    choices: ["Sales","Engineering","Finance","Legal"]
                }
            
            ]
            //ensures that you have all parameters met and then inserts the employee info into the employee table
            inquirer.prompt(employeeAddQuestions).then(response=>{
                const parameters=[response.title,response.salary,response.role_department]
                db.query("INSERT INTO role (title, salary, department_id)VALUES(?,?,?)",parameters,(err, data)=>{

                    viewRoles()
                })
            })
           })
    })
}

// allows you to add a new employee and their information
function updateEmployee(){
    db.query("select title as name, id as value from role", (er, roleData)=>{

           db.query(`select CONCAT(first_name, " " , last_name) as name,  id as value from employee where  manager_id is null `, (err, managerData)=>{
            const employeeAddQuestions=[
                {
                    type:"list",
                    name:"employee_name",
                    message: "What is the employee's name that you'd like to update?",
                    choices:["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown", "Sarah Lourd", "Tom Allen"]
            
                },
                {
                    type:"input",
                    name:"title",
                    message:"What is the employee's new role title?",
                    choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"]
            
                }
            
            ]
            //ensures that you have all parameters met and then inserts the employee info into the employee table
            inquirer.prompt(employeeAddQuestions).then(response=>{
                const parameters=[response.first_name,response.last_name,response.role_id, response.manager_id]
                db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id)VALUES(?,?,?,?)",parameters,(err, data)=>{

                    viewEmployees()
                })
            })
           })
    })
}

// allows you to combine data from the employee and manager information into one table
function viewEmployees(){
db.query(`
SELECT 
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
LEFT JOIN employee as mgr ON employee.manager_id =  mgr.id

`,  (err,data)=> {
    console.table(data)

    menu()
    
} )
}