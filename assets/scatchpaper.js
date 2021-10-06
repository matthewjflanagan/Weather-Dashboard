// You need to make a form with an input
// button to submit
var searchBtn = document.getElementById('search-button')
var cityInput = document.getElementById('city-input')

// Container for buttons after submission 

// When we click the search button or submit the form
searchBtn.addEventListener('click', citySearch) 
    // event listener on the click or submit (michael likes the submit option)
    function citySearch (city) {
        var city = cityInput;
        currentWeather (city);
        fiveDay (city);
        cityInput.val('');
    }



    function currentWeather (city) {
        var requestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={f7412588db28fd477a32d11dcd322400}'

        console.log(requestURL)
    }

    //     Grab the value from the input 
    //     Save the result in local storage (local storage .setItem)
    //     display button 
    //     clear the input
    // Middle Part
    //     fetch call to API
    //     1st get coordinates of location search for (One fetch for lat/long)
    //     2nd find the weather based on the coordinates (Second fetch https://openweathermap.org/api/one-call-api for other stuff)
    //         Display the information

        var user = prompt(cityName)
        fetch ("https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}" + cityName) 
            .then(function(response) {
                return response.json()
            })
            .then (function(data) {
                // have information in data
                // make another fetch, return fetch call if you want to change
                return fetch(data.repos_url)
            })
            .then(function(response) {
                // Grab information from first fetch call and plug it into the second fetch call
                // chain from return fetch call in previous .then
                return response.json()
            })
            .then(function(reposData) {
                console.log(reposData)
            })

