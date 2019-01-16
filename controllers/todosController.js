//import express
// //import todos.js
var todos=require('../models/todos');
var users = require('../models/users');
var express=require('express');
var app = express();
var router = express.Router();

router.get('/',function(req,res){
    res.render('rootCheck',{layout: 'rootCheckMain.handlebars'});
})

router.post('/addtask',function(req,res){
    console.log('entered POST/ route');
    console.log(req.body);

    todos.addTask(req.body.userNumber,req.body.description,function(){
        console.log('task has been added')
        res.redirect('/show/'+req.body.userNumber);
    });
})

router.delete('/todo',function(req,res){
    console.log('entered delete /todo route to clear table')
    userNumber=req.body.userNumber;
    todos.clearTable(userNumber,function(){
        res.redirect('/show/'+req.params.userNumber);
    });
})

router.post('/:userNumber/todo/:id',function(req,res){
    console.log('entered POST /:userNumber/:id route for marking as updated');
    todos.markAsDone(req.params.userNumber,req.params.id,function(){
        console.log('task updated boi')
        res.redirect('/show/'+req.params.userNumber);
    });
})

module.exports=router;