// var app = express();
const NewsAPI = require('newsapi');
// const newsapi = new NewsAPI('d5541b69da554cd18c2dccb01c5cd640');
const newsApiKey = require('../config/keys').newsKey;
console.log(newsApiKey);
const newsapi = new NewsAPI(newsApiKey);

var express=require('express');
var users = require('../models/users');
var todos=require('../models/todos');
var router = express.Router();

router.get('/:userNumber',(req,res)=>{
    const userNumber = req.params.userNumber

    console.log('***req.response** = ' + JSON.stringify(req.path))
    console.log('userNumber = '+userNumber)
    console.log('entered show/usernumber')
    
    users.getAllUserInfo(userNumber,function(userData){
        console.log('done getting all user info. going to get all tasks now');
        
        todos.getAllTasks(userNumber,function(userTasks){
            console.log('done getting all tasks. gonna get motivation')
            let randomIndex = Math.round(Math.random()*33)+1;

            users.getMotivated(randomIndex,function(motivationQuote){
                console.log('done getting motivation: '+ motivationQuote[0].quote);
                newsapi.v2.topHeadlines({
                    sources: userData[0].userSources,
                    language: 'en'
                }).then(response => {
    
                    console.log('total response: '+response.articles.length);
                    var half_length = Math.ceil(response.articles.length / 2);    
                    var leftSide = response.articles.splice(0,half_length); 
                    console.log('half '+leftSide.length);
                    console.log('right '+response.articles.length )
    
    
                    arbitraryName={
                        name:userData[0].name,
                        todos:userTasks,
                        city:userData[0].city,
                        longitude:userData[0].longitude,
                        latitude:userData[0].latitude,
                        userNumber:userData[0].userNumber,
                        motivation:motivationQuote[0].quote,
                        articlesLeft:leftSide,
                        articlesRight:response.articles
                    }
                    // console.log('sources used were:' + userData[0].userSources);
                    // console.log('response length was: '+response.articles.length)
                    // console.log('number of articles passed: '+response.articles.length);
                    // console.log('articles: '+response.articles)
                    res.render('index',arbitraryName);
                });

            });
            
        })   
    })
})

// router.get('/:userNumber',(req,res)=>{
//     const userNumber = req.params.userNumber

//     console.log('***req.response** = ' + JSON.stringify(req.path))
//     console.log('userNumber = '+userNumber)
//     console.log('entered show/usernumber')
    
//     users.getAllUserInfo(userNumber,function(userData){
//         console.log('done getting all user info. going to get all tasks now');

//         todos.getAllTasks(userNumber,function(userTasks){
//             console.log('done getting all tasks')
            
//             newsapi.v2.topHeadlines({
//                 sources: userData[0].userSources,
//                 language: 'en'
//             }).then(response => {

//                 console.log('total response: '+response.articles.length);
//                 var half_length = Math.ceil(response.articles.length / 2);    
//                 var leftSide = response.articles.splice(0,half_length); 
//                 console.log('half '+leftSide.length);
//                 console.log('right '+response.articles.length )


//                 arbitraryName={
//                     name:userData[0].name,
//                     todos:userTasks,
//                     city:userData[0].city,
//                     longitude:userData[0].longitude,
//                     latitude:userData[0].latitude,
//                     userNumber:userData[0].userNumber,
//                     motivation:'test quote',
//                     articlesLeft:leftSide,
//                     articlesRight:response.articles
//                 }
//                 // console.log('sources used were:' + userData[0].userSources);
//                 // console.log('response length was: '+response.articles.length)
//                 // console.log('number of articles passed: '+response.articles.length);
//                 // console.log('articles: '+response.articles)
//                 res.render('index',arbitraryName);
//             });
//         })   
//     })
// })

module.exports=router;