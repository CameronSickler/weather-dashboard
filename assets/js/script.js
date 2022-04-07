// global variables
var key = '157060892b19157fb785accbd112cc57'
var btnPrimaryEl = document.getElementById('search-btn');


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
        })
        .catch(function (err) {
            console.log(err)
        })
}

function citySearchEventHandler(ev) {
    ev.preventDefault();
    getLocationData('chicago');

}

btnPrimaryEl.addEventListener('click', citySearchEventHandler) 