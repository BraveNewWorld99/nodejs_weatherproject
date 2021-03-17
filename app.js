const express = require("express");

const app = express();

const https = require("https");

app.get("/", function(req, res) {

    const query = "Chicago";
    const apiKey = "f4fbbacad8e802cdbf1beb8e1dff776e";
    const units = "imperial";


    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query  + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function(response) {
        console.log(response);

        response.on("data", function(data) {


            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The temperature in Chicago is " + temp + " degrees Fahrenheit. </h1>");
            res.write("<img src=" + imageURL + ">");
            res.send();
        })
    })

})















app.listen(3000, function() {
    console.log("server is running on port 3000");

});