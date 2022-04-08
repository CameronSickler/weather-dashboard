// global variables
var key = '157060892b19157fb785accbd112cc57'
var btnPrimaryEl = document.getElementById('search-btn');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uvIndexEl = document.getElementById('uvIndex');


//function to fetch API
function getLocationData(city) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + key)
        .then(function (response) {
            return response.json()
        })
        .then(function (locationData) {
            console.log(locationData)
            getCurrentWeather(locationData[0].lat, locationData[0].lon)

        })
        .catch(function (err) {
            console.log(err)
        })

}

//function to get lat and lon data
function getCurrentWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + key)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherData) {
            console.log(weatherData)
            console.log(weatherData.current.temp)
            console.log(weatherData.current.wind_speed)
            console.log(weatherData.current.humidity)
            console.log(weatherData.current.uvi)
            var tempInfo = weatherData.current.temp
            var windInfo = weatherData.current.wind_speed
            var humidityInfo = weatherData.current.humidity
            var uviInfo = weatherData.current.uvi

            tempEl.innerText = ("Temperature: " + tempInfo)
            windEl.innerText = ("Wind: " + windInfo)
            humidityEl.innerText = ("Humidity: " + humidityInfo)
            uvIndexEl.innerText = ("UVIndex: " + uviInfo)

        })
        .catch(function (err) {
            console.log(err)
        })

    //    will test appending elements to <p> ids with weather data here



}

function citySearchEventHandler(ev) {
    ev.preventDefault();
    console.log(ev)
    getLocationData('milwaukee');

}

btnPrimaryEl.addEventListener('click', citySearchEventHandler) 