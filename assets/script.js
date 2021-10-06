$(document).ready(function () {
    var cityInput = document.querySelector(".city-input");
    var searchButton = document.querySelector(".search-button");
    var clearHistory = document.querySelector(".clear-history");
    var cityName = $('.city-title');
    var pic = $('#current-pic');
    var tempEl = $('#temperature');
    var humidityEl = $('#humidity');
    var windEl = $('#wind-speed');
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
                 console.log(data)
                displayCurrentWeather(data)
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
        // console.log(data)
        return fetch(queryURL);
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            uvIndex.text("UV Index: " + data.current.uvi);
            $('#day1temp').text("Temperature: " + data.daily[1].temp.day);
            $('#day1wind').text("Wind Speed: " + data.daily[1].wind_speed);
            $('#day1humidity').text("Humidity: " + data.daily[1].humidity);

            $('#day2temp').text("Temperature: " + data.daily[2].temp.day);
            $('#day2wind').text("Wind Speed: " + data.daily[2].wind_speed);
            $('#day2humidity').text("Humidity: " + data.daily[2].humidity);

            $('#day3temp').text("Temperature: " + data.daily[3].temp.day);
            $('#day3wind').text("Wind Speed: " + data.daily[3].wind_speed);
            $('#day3humidity').text("Humidity: " + data.daily[3].humidity);

            $('#day4temp').text("Temperature: " + data.daily[4].temp.day);
            $('#day4wind').text("Wind Speed: " + data.daily[4].wind_speed);
            $('#day4humidity').text("Humidity: " + data.daily[4].humidity);

            $('#day5temp').text("Temperature: " + data.daily[5].temp.day);
            $('#day5wind').text("Wind Speed: " + data.daily[5].wind_speed);
            $('#day5humidity').text("Humidity: " + data.daily[5].humidity);
        })
    }

    function displayCurrentWeather(data) {
        cityName.text("City Name: " + data.name);
        tempEl.text("Temperature: " + k2f(data.main.temp));
        humidityEl.text("Humidity: " + data.main.humidity);
        windEl.text("Wind Speed: " + data.wind.speed);
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