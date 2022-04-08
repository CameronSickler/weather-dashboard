// global variables
var key = '157060892b19157fb785accbd112cc57'
var btnPrimaryEl = document.getElementById('search-btn');
var inputEl = document.getElementById('enter-city');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uvIndexEl = document.getElementById('uvIndex');
var cityNameEl = document.getElementById('city-name');


//function to fetch API for the city by city name
function getLocationData(city) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + key)
        .then(function (response) {
            return response.json()
        })
        .then(function (locationData) {
            getCurrentWeather(locationData[0].lat, locationData[0].lon)

        })
        .catch(function (err) {
            console.log(err)
        })

}

//function to get weather for location by latitude and longitude values
function getCurrentWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + key)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherData) {

            console.log(weatherData)

            //local variables to store weather data from API
            var tempInfo = weatherData.current.temp
            var windInfo = weatherData.current.wind_speed
            var humidityInfo = weatherData.current.humidity
            var uviInfo = weatherData.current.uvi

            // add weather information to innerText areas of HTML
            tempEl.innerText = ("Temperature: " + tempInfo)
            windEl.innerText = ("Wind: " + windInfo)
            humidityEl.innerText = ("Humidity: " + humidityInfo)
            uvIndexEl.innerText = ("UVIndex: " + uviInfo)

        })
        .catch(function (err) {
            console.log(err)
        })
}

function citySearchEventHandler(ev) {
    ev.preventDefault();
    console.log(ev)

    // passes the input value of what is typed in for a city name as parameter
    getLocationData(inputEl.value);

    console.log(inputEl.value)

    // add date and time populate to event handler

    var today = new Date();

    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    cityNameEl.innerText = ("City Details: " + inputEl.value + "  " + today)
}

btnPrimaryEl.addEventListener('click', citySearchEventHandler) 