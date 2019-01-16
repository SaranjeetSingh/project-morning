//require connection.js
var connection = require('./connection');

// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

//------------------------------------Task Queries----------------------------------------------------------------

function getAllTasks(userNumber,callBack){
    console.log('userNumber inside getAllTasks = ' + userNumber)
    let tableName= "todo"+userNumber;
    console.log('getting all tasks from '+tableName)

    connection.query('SELECT * FROM ??',[tableName],function(err,data){
        if(err)throw err;

        if(typeof callBack==='function'){
            callBack(data);
        }
    })
}

function addTask(userNumber,taskName,callBack){
    let userTable= "todo"+userNumber;
    console.log('getting all tasks from '+userTable)

    console.log('going to insert '+taskName+' into '+userTable)
    connection.query("INSERT INTO ?? (description,completed) VALUES(?,0)",[userTable,taskName],function(err,result){
        if(err) throw err;
        callBack();
    })
}

function markAsDone(userNumber,taskId,callback){
    let userTable= "todo"+userNumber;
    console.log('updating task '+taskId+' from '+userTable)

    connection.query("UPDATE ?? SET completed=1 WHERE id=?",[userTable,taskId],function(err,data){
        if(err) throw err;
        callback();
    })
}

function clearToDoTable(userNumber,callback){
    console.log("ORM - going to clear table of "+userNumber)
    let todoListUser= "todo"+userNumber;
    connection.query('DELETE FROM ??',[todoListUser],function(err,res){
        if(err) throw err;
        console.log(userNumber + " table cleared!");
        callback();
    })
}


//------------------------------------User Queries----------------------------------------------------------------

function getAllUserInfo(userNumber,callBack){
    connection.query('SELECT * FROM users WHERE userNumber=?',[userNumber],function(err,data){
        if(err)throw err;

        if(typeof callBack==='function'){
            callBack(data);
        }
    })
}

function createNewUser(userNumber,name,city,longitude,latitude,userSources,callBack){
    connection.query('INSERT INTO users (userNumber,name,city,longitude,latitude,userSources) VALUES(?,?,?,?,?,?)',[userNumber,name,city,parseInt(longitude),parseInt(latitude),userSources.toString()],function(err,res){
        if(err) throw err;
        console.log("new user created! "+userNumber);

        let todoListUser= "todo"+userNumber;
        console.log(todoListUser);
        console.log(typeof todoListUser);

        createTodoTable(todoListUser);
        callBack();
    })
}

function getMotivated(randomIndex,callback){
    connection.query('SELECT quote FROM motivation WHERE id=?',[randomIndex],function(err,data){
        if(err) throw err;
        callback(data);
    })
}

function createTodoTable(newTableName){
    connection.query('CREATE TABLE ?? (id INT AUTO_INCREMENT NOT NULL,description VARCHAR(255),completed BOOLEAN NOT NULL,PRIMARY KEY (id))',[newTableName],function(err,res){
        if(err)throw err;
        console.log("new table created! "+newTableName);
    })
}

function updateUser(userNumber,newCity,newLongitude,newLatitude,newSources){
    connection.query('UPDATE users SET city=?,longitude=?,latitude=?,userSources=? WHERE userNumber=?',[newCity,newLongitude,newLatitude,newSources,userNumber],function(err,res){
        if(err) throw err;
        console.log("new user created!");
    })
}

function deleteUser(userNumber){
    connection.query('DELETE FROM users WHERE userNumber=?',[userNumber],function(err,res){
        if (err) throw err;
        console.log(userNumber + " deleted!");
    })
}

// Export the ORM object in module.exports.
module.exports={
    getAllTasks:getAllTasks,
    getAllUserInfo:getAllUserInfo,
    addTask:addTask,
    markAsDone:markAsDone,
    createNewUser:createNewUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
    clearToDoTable:clearToDoTable,
    getMotivated:getMotivated
}