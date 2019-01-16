//setup the code to connect Node to MySQL.
//export the connection
var mysql = require('mysql');

if(process.env.JAWSDB_URL){
    var connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "mani2703",
        database: "morningApp"
    });
}

connection.connect(function(err){
    if(err)throw err;
    console.log("connected as id " + connection.threadId);
})

module.exports= connection;