//Notes to fellow Developer - Hello! My name is Cameron and thank you 
//for taking a look at my code! I hope you enjoy it :)

// global variables
var key = '157060892b19157fb785accbd112cc57'
var btnPrimaryEl = document.getElementById('search-btn');
var inputEl = document.getElementById('enter-city');

//variables used for dynamically creating elements that display
//city details and weather information
var cityNameEl = document.getElementById('city-name');
var tempEl = document.getElementById('temp');
var windEl = document.getElementById('wind');
var humidityEl = document.getElementById('humidity');
var uvIndexEl = document.getElementById('uvIndex');
var listContLiEl = document.getElementById('list-cont');

//variables used for dynamically creating elements that
//display 5 day forecast forecast elements
var day1El = document.getElementById('day1');
var day2El = document.getElementById('day2');
var day3El = document.getElementById('day3');
var day4El = document.getElementById('day4');
var day5El = document.getElementById('day5');

var numberOfDays = [day1El, day2El, day3El, day4El, day5El]

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

function clearUVIndexColor() {
    uvIndexEl.removeAttribute("class", "favorable");
    uvIndexEl.removeAttribute("class", "moderate");
    uvIndexEl.removeAttribute("class", "severe");
}

//function to get weather for location by latitude and longitude values
function getCurrentWeather(lat, lon) {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + key)
        .then(function (response) {
            return response.json()
        })
        .then(function (weatherData) {

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
            if (uvInfo < 2) {
                clearUVIndexColor();
                uvIndexEl.setAttribute("class", "favorable");
            } else if (uvInfo >= 2 && uvInfo <= 5) {
                clearUVIndexColor();
                uvIndexEl.setAttribute("class", "moderate");
            } else if (uvInfo > 5) {
                clearUVIndexColor();
                uvIndexEl.setAttribute("class", "severe");
            }

            // add 5 day forecast logic begins here

            //local variable for number of days in the forecast
            // var numberOfForecastDays = [day1, day2, day3, day4, day5]
            var index = 0;

            //for loop to generate a single li element for each day of the forecast
            for (i = 0; i < numberOfDays.length; i++) {

                //local variables that save the weather information values obtained by
                // grilling down into the API
                var forecastDescription = weatherData.daily[index].weather[0].description
                var forecastIcon = weatherData.daily[index].weather[0].icon
                //local variable to take icon id from API and prepare it for becoming an img src value
                var forecastIconURL = "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png"

                var forecastTemp = ("Temperature: " + weatherData.daily[index].temp.day + " *F")
                var forecastHumidy = ("Humidity: " + weatherData.daily[index].humidity + " %")
                var forecastUVI = ("UVIndex: " + weatherData.daily[index].uvi)

                //local variable to save the weather information gathered from the API into an array
                var fiveDayForecastInfo = [forecastDescription, forecastTemp, forecastHumidy, forecastUVI]

                //local variable create an img element, set the src to a unique weather icon, then append it to the 
                //appropriate forecast day in the for loop. 
                var createIMG = document.createElement('img');
                createIMG.setAttribute("src", forecastIconURL);
                numberOfDays[i].appendChild(createIMG);

                //nested for loop add information to the previously created li in the parent for loop.

                for (j = 0; j < fiveDayForecastInfo.length; j++) {

                    var li = document.createElement('li');
                    li.innerText = fiveDayForecastInfo[j];
                    numberOfDays[i].appendChild(li);
                }

                //incrementor so that after all relevant weather information is added to the li,
                //the loop can progress to create another li element and add information to it
                //until no more li elements are needed.
                index = index + 1
            }
        })
        .catch(function (err) {
            console.log(err)
        })
}


//function to clear elements that would be displaying weather information and 5day
// forecast information on the browser in the event the user searches more than once
// and/or re-searches previous cities.
function clearElements() {
    day1El.innerHTML = ('')
    day2El.innerHTML = ('')
    day3El.innerHTML = ('')
    day4El.innerHTML = ('')
    day5El.innerHTML = ('')
    tempEl.innerHTML = ('')
    windEl.innerHTML = ('')
    humidityEl.innerHTML = ('')
    uvIndexEl.innerHTML = ('')
}

//function to handle event listener click on city search main input search button
function citySearchEventHandler(ev) {
    ev.preventDefault();
    clearElements();
    //function call to create an li and btn element representing the previously searched city name
    createBtnElement(inputEl.value);

    // passes the input value of what is typed in for a city name as parameter
    getLocationData(inputEl.value);


    // add date and time populate to event handler

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    cityNameEl.innerText = ("City Details: " + inputEl.value + "  " + today)
}

// function to handle event listener click on previously searched city buttons. The
//event listener for this is added to a button element when createBtnElement function is
//called.
function previousCitySearchEventHandler(ev) {
    ev.preventDefault();
    clearElements();
    //local variable that grills down to a string value of the city name that can be passed
    //to getLocationData as the parameter to search again for the forecast details
    var city = ev.srcElement.innerText
    getLocationData(city);
}

//function to dynamically create elements which is called from within 
// the previousCitySearchEventHandler function
function createBtnElement() {

    //set the input value which at the time this is ran would be the city name 
    //that was lasted typed into the search bar before clicking the submit button
    //and saving that city name to local storage.
    localStorage.setItem('city', JSON.stringify(inputEl.value))

    //local variables that create button and li elements
    var createCitySearchBtn = document.createElement('button');
    var createLiEl = document.createElement('li');

    //creates li and button elements, adds event listener to the btn and appends to the HTML
    createLiEl.innerText = ''
    createCitySearchBtn.innerText = (inputEl.value)
    createCitySearchBtn.addEventListener('click', previousCitySearchEventHandler)
    listContLiEl.appendChild(createLiEl)
    createLiEl.appendChild(createCitySearchBtn)
}

//eventlistener for searching city name on button click
btnPrimaryEl.addEventListener('click', citySearchEventHandler) 