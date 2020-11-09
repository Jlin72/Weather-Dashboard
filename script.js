var cityInputEl = $("#cityinput");
var currentCityEl= $("#currentcity");
var temperatureEl = $("#temperature");
var humidityEl = $("#humidity");
var windEl = $("#wind");
var uvEl = $("#UV");
var imgEl=$("#wicon");
var uvSpanEl=$("#uvspan");
var forecast=$(".forecast");
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
            var currentYear = new Date().getFullYear(); // This variable will be used to store the current year.
            var currentMonth = new Date().getMonth(); // This variable will be used to store the current month.
            var currentDay = new Date().getDate(); // This variable will be used to store the current day.
            var latitute = data.coord.lat; // This variable will be used to store the latitude of the current city.
            var longitude = data.coord.lon; // This variable will be used to store the longitude of the current city.
            var iconId= data.weather[0].icon; //This line is used to fetch the weather icon
            currentCityEl.text(data.name+"("+currentMonth+"/"+currentDay+"/"+currentYear+")"); //this line of code will add the city name and the current date.
            temperatureEl.text("temperature: "+temperatureF+"°F"); // This line of code will give write the temperature for the html element that has an id of temperature.
            humidityEl.text("humidity: "+data.main.humidity+"%"); // This line of code will write the humidity level for the html element that has an id of humidity.
            windEl.text("wind-speed: "+data.wind.speed+"MPH"); // This line of code will write the wind speed for the html element with an id of wind.
            imgEl.attr("src", "https://openweathermap.org/img/wn/"+iconId+".png");//This line is used to add a src attribute to the img HTML element.
            imgEl.attr("alt", data.weather[0].description); //This line is used to add a description to the img HTML element.
            imgEl.attr('id', "wIcon"); //This line is used to add an ID to the newly created img HTML element.
            
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
            .then(function (response) {
                console.log (response);
                return response.json(); //This line is used transform the response into a Json format.
            })
            .then(function(data) {
                console.log(data);
                for (i=0;i<5;i+=1) {
                    var forecastIndex = i*8 + 4;
                    var indexDate=new Date(data.list[forecastIndex].dt*1000); //transform the dt from the API to a day, month and year format.
                    var futureDay = indexDate.getDate(); //This line is used to get the current date
                    var futureMonth = indexDate.getMonth() + 1; //This line is used to get the current month
                    var futureYear = indexDate.getFullYear(); //this line is used to get the current year
                    var forecastDiv = $("<div>"); //Create a new div
                    forecastDiv.addClass("col bg-primary text-white ml-3 ml-b rounded");
                    forecast.append(forecastDiv); //append the new div to the div with a forecast class
                    var forecastP = $("<p>");  //Create a new p html element that will be used to contain the date.
                    forecastP.text(futureDay+"/"+futureMonth+"/"+futureYear); //this line will be used to give the new p html element the different days.
                    forecastP.addClass("dayforecast"); //add a class of dayforecast for the new p html element.
                    var forecastImg = $("<img>"); //Create a new img html element
                    forecastImg.attr("src", "https://openweathermap.org/img/wn/"+data.list[forecastIndex].weather[0].icon+".png") //this line of code will add a src for the image tag. This is done to obtain the icon for the weather from the openweather API.
                    forecastImg.attr("alt", data.list[forecastIndex].weather[0].description); //this line of code will add a description to the img html element.
                    var forecastTemp = $("<p>"); //Create a new p html element this will be used to store the temperature.
                    var tempToF = Math.round((((data.list[forecastIndex].main.temp-273.15)*1.8)+32)*10)/10; //This line is used to transform the temp value from kelvin to fahrenheit.
                    forecastTemp.text("Temperature: " +tempToF+ "°F"); //This line of code is used to add a text value to the p html element created from the var forecastTemp.
                    forecastTemp.addClass("forecasttemp"); //This line is used to add a class of forecasttemp to the recently create p HTML element from the var forecastTemp.
                    var forecastHum = $("<p>"); //This line is used to create a new p HTML element and store it on a var called forecastHum.
                    forecastHum.text("Humidity: "+data.list[forecastIndex].main.humidity + "%"); //This line is used to add the text for the p element from forecastHum.
                    forecastHum.addClass("forecasthumidity"); //This line is used to add a class to the newly created p HTML element contained within the var forecastHum.
                    forecastDiv.append(forecastP,forecastImg,forecastTemp,forecastHum); //This line is used to append all the newly created HTML elements to the new forecastDiv created before.
                }
            })
        })
        
    }
    currentWeather()
})
