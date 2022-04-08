// global variables
var key = '157060892b19157fb785accbd112cc57'
var btnPrimaryEl = document.getElementById('search-btn');
var inputEl = document.getElementById('enter-city');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uvIndexEl = document.getElementById('uvIndex');
var cityNameEl = document.getElementById('city-name');
var day1El = document.getElementById('day1');
var day2El = document.getElementById('day2');
var day3El = document.getElementById('day3');
var day4El = document.getElementById('day4');
var day5El = document.getElementById('day5');


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
            var uvInfo = weatherData.current.uvi

            // add weather information to innerText areas of HTML
            tempEl.innerText = ("Temperature: " + tempInfo + " *F")
            windEl.innerText = ("Wind: " + windInfo + " MPH")
            humidityEl.innerText = ("Humidity: " + humidityInfo + " %")
            uvIndexEl.innerText = ("UVIndex: " + uvInfo)

            // if statement to set class for color change of uvIndex text
            if (uvInfo <= 2) {
                uvIndexEl.setAttribute("class", "favorable");
            } else if (uvInfo >= 2 && uvInfo <= 5) {
                uvIndexEl.setAttribute("class", "moderate");
            } else if (uvInfo <= 5) {
                uvIndexEl.setAttribute("class", "severe");
            }

            // add 5 day forecast elements here

            var numberOfForecastDays = [day1, day2, day3, day4, day5]
            var index = 0;

            for (i = 0; i < numberOfForecastDays.length; i++) {

                var forecastDescription = weatherData.daily[index].weather[0].description
                var forecastIcon = weatherData.daily[index].weather[0].icon
                var forecastTemp = ("Temperature: " + weatherData.daily[index].temp.day + " *F")
                var forecastHumidy = ("Humidity: " + weatherData.daily[index].humidity + " %")
                var forecastUVI = ("UVIndex: " + weatherData.daily[index].uvi)

                var fiveDayForecastInfo = [forecastDescription, forecastIcon, forecastTemp, forecastHumidy, forecastUVI]

                for (j = 0; j < fiveDayForecastInfo.length; j++) {

                    var li = document.createElement('li');
                    li.innerText = fiveDayForecastInfo[j];
                    numberOfForecastDays[i].appendChild(li);
                }

                index = index + 1
            }
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