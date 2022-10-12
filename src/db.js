const mysql = require("mysql")

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "12345",
    database: "users"
})

db.connect(function(err){
    if(err) throw err;
    console.log("Connect!");
})

module.exports = db