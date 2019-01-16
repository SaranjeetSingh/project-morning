//import orm.js
var orm = require('../config/orm');

var users = {
    getAllUserInfo:function(userNumber,callback){
        orm.getAllUserInfo(userNumber, function(response){
            callback(response);
        })
    },
    createNewUser:function(userNumber,name,city,longitude,latitude,userSources,callback){
        orm.createNewUser(userNumber,name,city,longitude,latitude,userSources,callback);
    },
    updateUserInfo:function(userNumber,newCity,newLongitude,newLatitude,userSources){
        orm.updateUser(userNumber,newCity,newLongitude,newLatitude,userSources)
    },
    getMotivated:function(randomIndex, callback){
        console.log("randomIndex:"+randomIndex);
        orm.getMotivated(randomIndex,callback);
    }
}

module.exports=users;
