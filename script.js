var cityInputEl = $("#cityinput");
var currentCityEl= $("#currentcity");
var temperatureEl = $("#temperature");
var humidityEl = $("#humidity");
var windEl = $("#wind");
var uvEl = $("#UV");
var imgEl=$("#wicon");
var uvSpanEl=$("#uvspan");
var apiKey= "dc73b9f2be92cd0a2da9c582e9770b1c";
var city="mississauga";
var requestUrl= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ apiKey; //API URL for the openweather API.

$(document).ready(function() {
    function currentWeather() {
        fetch(requestUrl) // starting a fetch request for the openweather APi
        .then (function(response){
            console.log("there is a ", response) //this line of code is used to confirm if there is a response from the fetch request.
            return response.json();
        })
        .then (function(data){
            console.log(data);
            var temperatureF=Math.round((((data.main.temp-273.15)*1.8)+32)*10)/10; // this variable is used to convert the temperature from kelvin to fahrenheit and round it to one decimal.
            var currentYear = new Date().getFullYear(); // this variable will be used to store the current year.
            var currentMonth = new Date().getMonth(); // this variable will be used to store the current month.
            var currentDay = new Date().getDate(); // this variable will be used to store the current day.
            var latitute = data.coord.lat; // this variable will be used to store the latitude of the current city.
            var longitude = data.coord.lon; // this variable will be used to store the longitude of the current city.
            var iconId= data.weather[0].icon; //this line is used to fetch the weather icon
            currentCityEl.text(data.name+"("+currentMonth+"/"+currentDay+"/"+currentYear+")"); //this line of code will add the city name and the current date.
            temperatureEl.text("temperature: "+temperatureF+"°F"); // this line of code will give write the temperature for the html element that has an id of temperature.
            humidityEl.text("humidity: "+data.main.humidity+"%"); // this line of code will write the humidity level for the html element that has an id of humidity.
            windEl.text("wind-speed: "+data.wind.speed+"MPH"); // this line of code will write the wind speed for the html element with an id of wind.
            imgEl.attr("src", "https://openweathermap.org/img/wn/"+iconId+".png");
            imgEl.attr("alt", data.weather[0].description);
            imgEl.attr('id', "wicon");
            
            var uvUrl= "https://api.openweathermap.org/data/2.5/uvi?lat="+latitute+"&lon="+longitude+"&appid="+apiKey;
            fetch(uvUrl) //Starting a second fetch request for to obtain the UV from the open weather API.
            .then (function (response) {
                console.log ("UV has a "+response);
                return response.json();
            })
            .then (function (data) {
                console.log(data);
                var currentUV= data.value;
                uvSpanEl.text(currentUV);
                if (currentUV<3) { // this if statement will add a background color to the value of the current uv index based on how high the uv is.
                    uvSpanEl.addClass("lowuv");
                } else if (currentUV<5) {
                    uvSpanEl.addClass("moderateuv");
                } else if (currentUV<7) {
                    uvSpanEl.addClass("highuv");
                } else {
                    uvSpanEl.addClass("veryhighuv");
                }
            })
            var cityId= data.id;
            var futureUrl= "https://api.openweathermap.org/data/2.5/forecast?id="+cityId+"&appid="+apiKey;
            fetch(futureUrl)
            .then(function(response) {
                console.log ("future forecast has a "+response);
                return response;
            })
            .then(function(data) {
                console.log(data);
                return data;
            })
        })
        
    }
    currentWeather()
})
