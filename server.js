require("dotenv").load();
var express = require('express');
var path = require("path");
var keys = require("./config/keys.js");
const axios = require("axios");
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./public"));
app.use("/form",express.static("./public"))
app.use("/show",express.static("./public"))

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


var router = require('./controllers/todosController');
var formRouter = require('./controllers/formController');
var showRouter = require('./controllers/showController');
app.use("/",router);
app.use("/form",formRouter);
app.use("/show",showRouter);


var PORT = (process.env.PORT || 4000);  

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});

app.post("/api/weather", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    // console.log(keys.weather);
    var weather = keys.id;
    var loc = req.body;
    //loc.longitude loc.latitude
    var long = loc.longitude; //40.7406424 
    var lat = loc.latitude; //-74.0615268 
    //call weather api passing these latitude and longitude
    //return required data
    // console.log(long);
    axios.get('https://api.darksky.net/forecast/' + weather + '/' + lat + ',' + long)
    .then(function (response) {
        console.log(response.data.currently.icon);
        console.log("Temp : " + response.data.currently.temperature + "  Degree f");
        console.log("Humidity : " + response.data.currently.humidity);
        console.log("Wind-speed : " + response.data.currently.windSpeed);
        var weather = {};
        weather.temp = response.data.currently.temperature;
        weather.humidity= response.data.currently.humidity;
        weather.windSpeed = response.data.currently.windSpeed;
        return res.json(weather);
    })
    .catch(function (error) {
        console.log(error);
    });
});

app.post("/api/cityPosition", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    // console.log(keys.weather);
    var position = keys.key;
    var city = req.body.city;
    var state = req.body.state;
    console.log(position);
    var url = 'http://www.mapquestapi.com/geocoding/v1/address?key=' + position + '&location=' + city + ',' + state;
    console.log("url is : " +  url);
    axios.get(url, { responseType: 'json' })
    .then(function (response) {
        // console.log("response is : " + response.results[0]);
        console.log(response.data.results[0].locations[0].latLng.lat);
        console.log(response.data.results[0].locations[0].latLng.lng);
        var position = {};
        position.lat = response.data.results[0].locations[0].latLng.lat;
        position.lng = response.data.results[0].locations[0].latLng.lng;
        
        return res.json(position);

        //console.log(util.inspect(response.data, {showHidden: false, depth: null}))

        
    })
    .catch(function (error) {
        console.log(error);
    });
});



app.post("/api/news", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    // console.log(keys.weather);
    var newskey = keys.newsKey;
    // var selection = req.body;
    var selection = "business+sports";
    axios.get('https://newsapi.org/v2/everything?q=' + selection + '&apiKey=' + newskey)
    .then(function (response) {
        var articles = response.data.articles;
        console.log(articles[0].title);

        //create an empty array for titles
        //iterate over articles, and push each title into array titles.

        var newsArray = [];
        for(var i=0; i<articles.length; i++){
            newsArray.push(articles[i].title);
        }
        console.log(newsArray);
        var newsObj = {news:newsArray}
        return res.json(newsObj);
    })
    .catch(function (error) {
        console.log(error);
    });
});
