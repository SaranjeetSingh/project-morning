//import orm.js
var orm = require('../config/orm');

//create the code that will call the ORM functions using task specific input for the ORM.
var todoList={
    getAllTasks:function(tableName,callBack){
        orm.getAllTasks(tableName,function(response){
            callBack(response);
        })
    },

    markAsDone:function(userNumber,idTask,callback){
        orm.markAsDone(userNumber,idTask,callback);
    },

    addTask:function(userNumber,newTask,callback){
       orm.addTask(userNumber,newTask,callback);
    },
    
    clearTable:function(userNumber,callback){
        orm.clearToDoTable(userNumber,callback);
    }
}

//export   
module.exports=todoList;