var cityInput = document.querySelector(".city-input");
var searchButton = document.querySelector(".search-button");
var clearHistory = document.querySelector(".clear-history");
var cityName = document.querySelector(".city-title");
var Pic = document.getElementById("current-pic");
var Temp = document.getElementById("temperature");
var Humidity = document.getElementById("humidity");4
var Wind = document.getElementById("wind-speed");
var UVIndex = document.getElementById("UV-index");
var history = document.getElementById("history");
let searchHistory = JSON.parse(localStorage.getItem("search"));

var APIKey = "f7412588db28fd477a32d11dcd322400";
//  When the search button is clicked, look for the city name the from the user input
function currrentWeather(cityName) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    //  Execute fetch request from open weather map api
            fetch (queryURL)
            .then(function(response){
                console.log(response);

                var today = moment();
                $("")
                console.log(today);
            })
        };

searchButton.addEventListener("click",function() {
    var searchTerm = cityInput.value;
    currrentWeather (searchTerm)
})