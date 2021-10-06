$(document).ready(function () {
    var cityInput = document.querySelector(".city-input");
    var searchButton = document.querySelector(".search-button");
    var clearHistory = document.querySelector(".clear-history");
    var cityName = $('.city-title');
    var pic = $('#current-pic');
    var temp = $('#temperature');
    var humidity = $('#humidity');
    var wind = $('#wind-speed');
    var uvIndex = $('#UV-index');
    var history = $('#history');

    var APIKey = "f7412588db28fd477a32d11dcd322400";
    //  When the search button is clicked, look for the city name the from the user input
    function getWeather(cityName) {
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        //  Execute fetch request from open weather map api
        fetch(queryURL)
            .then(function (response) {
                return response.json()

            })
            .then(function (data) {
                //  console.log(data)
                displayWeather(data)
                getUVIndex(data);
            })

    };

    function getUVIndex (data) {
        var lat = data.coord.lat
        var lon = data.coord.lon
        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly" + "&appid=" + APIKey;
        // Execute fetch request from open weather api
        fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
        console.log(data)
        return fetch(queryURL);
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            uvIndex.text("UV Index: " + data.current.uvi);
        })
    }



    function displayWeather(data) {
        cityName.text("City Name: " + data.name);
        temp.text("Temperature: " + k2f(data.main.temp));
        humidity.text("Humidity: " + data.main.humidity);
        wind.text("Wind Speed: " + data.wind.speed);
    }

    searchButton.addEventListener("click", function () {
        var searchTerm = cityInput.value;
        getWeather(searchTerm)
        // put function for passing data from cityInput and save to local storage
    })


    function k2f(K) {
        return Math.floor((K - 273.15) *1.8 +32);
    }
    // create function for passing data from cityInput and save to local storage

    // var today = moment();
    // $(cityName).text(today.format("MMM Do, YYYY"));
    // console.log(today);
})