$(document).ready(function () {
    var cityInput = document.querySelector(".city-input");
    var searchButton = document.querySelector(".search-button");
    var clearHistory = document.querySelector(".clear-history");
    var cityName = $('.city-title');
    var pic = $('#current-pic');
    var tempEl = $('#temperature');
    var tempElR = $('#temperatureRange');
    var humidityEl = $('#humidity');
    var windEl = $('#wind-speed');
    var uvIndex = $('#UV-index');
    var historyEl = $('#history');
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    

    var APIKey = "f7412588db28fd477a32d11dcd322400";
    //  When the search button is clicked, look for the city name the from the user input
    function getWeather(cityName) {
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`;
        //  Execute fetch request from open weather map api
        fetch(queryURL)
            .then(function (response) {
                return response.json()

            })
            .then(function (data) {
                 console.log(data)
                displayCurrentWeather(data)
                fiveDayForecast(data);
            })
    };

    function fiveDayForecast (data) {
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
            $('#day1temp').text("Average Temp: " + k2f(data.daily[1].temp.day) + "° F" + " & Feels like: " + k2f(data.daily[1].feels_like.day) + "° F");
            $('#day1wind').text("Wind Speed: " + data.daily[1].wind_speed + " mph");
            $('#day1humidity').text("Humidity: " + data.daily[1].humidity + "%");

            $('#day2temp').text("Average Temp: " + k2f(data.daily[2].temp.day) + "° F" + " & Feels like: " + k2f(data.daily[2].feels_like.day) + "° F");
            $('#day2wind').text("Wind Speed: " + data.daily[2].wind_speed + " mph");
            $('#day2humidity').text("Humidity: " + data.daily[2].humidity + "%");

            $('#day3temp').text("Average Temp: " + k2f(data.daily[3].temp.day) + "° F" + " & Feels like: " + k2f(data.daily[3].feels_like.day) + "° F");
            $('#day3wind').text("Wind Speed: " + data.daily[3].wind_speed + " mph");
            $('#day3humidity').text("Humidity: " + data.daily[3].humidity + "%");

            $('#day4temp').text("Average Temp: " + k2f(data.daily[4].temp.day) + "° F" + " & Feels like: " + k2f(data.daily[4].feels_like.day) + "° F");
            $('#day4wind').text("Wind Speed: " + data.daily[4].wind_speed + " mph");
            $('#day4humidity').text("Humidity: " + data.daily[4].humidity + "%");

            $('#day5temp').text("Average Temp: " + k2f(data.daily[5].temp.day) + "° F" + " & Feels like: " + k2f(data.daily[5].feels_like.day) + "° F");
            $('#day5wind').text("Wind Speed: " + data.daily[5].wind_speed + " mph");
            $('#day5humidity').text("Humidity: " + data.daily[5].humidity + "%");
        })
    }

    function displayCurrentWeather(data) {
        pic.text(data.weather[0].main);
        tempElR.text("High: " + k2f(data.main.temp_max) + "° F" + " & Low: " + k2f(data.main.temp_min) + "° F");
        cityName.text("City Name: " + data.name);
        tempEl.text("Current Temp: " + k2f(data.main.temp) + "° F & Feels like: " + k2f(data.main.feels_like) + "° F");
        humidityEl.text("Humidity: " + data.main.humidity + "%");
        windEl.text("Wind Speed: " + data.wind.speed + " mph");
    }

    searchButton.addEventListener("click", function () {
        var searchTerm = cityInput.value;
        getWeather(searchTerm)
        // put function for passing data from cityInput and save to local storage
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        renderSearchHistory();
    })

    clearHistory.addEventListener("click",function() {
        localStorage.clear();
    })

    function k2f(K) {
        return Math.floor((K - 273.15) *1.8 +32);
    }

    // create function for passing data from cityInput and save to local storage
    function renderSearchHistory() {
        historyEl.innerHTML = "";
        historyEl.empty()
        for (let i = 0; i < searchHistory.length; i++) {
            const historyItem = document.createElement("input");
            historyItem.setAttribute("type","text");
            historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click",function() {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
    // var today = moment();
    // $(cityName).text(today.format("MMM Do, YYYY"));
    // console.log(today);
})