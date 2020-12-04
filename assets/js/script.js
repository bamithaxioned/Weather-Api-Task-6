// grabbing Elements
let submitBtn = document.querySelector(".btn");
let inputTag = document.getElementById("input-city");
let wind = document.querySelector(".wind");
let weatherCard = document.querySelector(".weather-card");

// Creating Object for weather api link and key 
let weatherApi = {
    url: "https://api.openweathermap.org/data/2.5/weather",
};

// Function to get weather Resport
function getWeatherReport(city){ 
    fetch(`${weatherApi.url}?q=${city}&appid=369d9632fac18756245f003614f7cdb2&units=metric`)
    .then(weather => weather.json()).then(showWeatherReport).catch(error => alert("Wrong Name"));
}

// Function to Show Weather Report on DOM
function showWeatherReport(weather){    
    // grabbing elements
    let cityName = document.querySelector(".city-name");
    cityName.innerHTML = `${weather.name}`;
    let temperature = document.querySelector(".temperature");
    temperature.innerHTML = Math.floor(`${weather.main.temp}`);

    let weatherCondition = document.querySelector(".weather-condition");
    weatherCondition.innerHTML = `${weather.weather[0].main}`;
    
    if(`${weather.weather[0].main}`=== "Haze" ){
        wind.classList = "wind fas fa-smog";
    }else if(`${weather.weather[0].main}`=== "Smoke"){
        wind.classList = "wind fas fa-smog";
    }else if(`${weather.weather[0].main}`=== "Rain"){
        wind.classList = "wind fas fa-cloud-rain";
    }else if(`${weather.weather[0].main}`=== "Clouds"){
        wind.classList = "wind fas fa-cloud";
    }else if(`${weather.weather[0].main}`=== "Drizzle"){
        wind.classList = "wind fas fa-cloud-sun-rain";
    }else{
        wind.classList = "wind";
    }    
}

// Date and Time Management Function
function date(){
    let date = new Date();
    let currentDate = date.toLocaleDateString();
    let inputDate = document.querySelector(".date");
    inputDate.innerHTML = currentDate;
}

function time(){
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = "AM";
     
    if(hours > 12) { 
        hours -=12;
        ampm = "PM"
     }

    if(hours == 00) { hours =12; }

    hours  = (hours < 10) ? "0"+hours : hours;
    minutes  = (minutes < 10) ? "0"+minutes : minutes;
    seconds  = (seconds < 10) ? "0"+seconds : seconds;
    
    let currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    let inputTime = document.querySelector(".time");
    inputTime.innerHTML = currentTime;
}

// adding Event Listener to Submit Button
submitBtn.addEventListener("click",(e) => {
    e.preventDefault();

    let inputValue = inputTag.value.trim();

    getWeatherReport(inputValue);
    date();
    setInterval(time, 1000);
    if(inputValue != ""){
        weatherCard.style.display = "flex";
    }
    
    inputTag.value = "";
})
