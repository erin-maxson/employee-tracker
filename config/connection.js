const mysql=require("mysql2")
require("dotenv").config()
console.log(process.env.DB_USERNAME,process.env.DB_PASSWORD,process.env.DB_DATABASE)
const db= mysql.createConnection({
    host:"localhost",
    port: 3306,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.connect(err => {
    if(err) throw err;
    console.log("Database connected")
})

module.exports=db