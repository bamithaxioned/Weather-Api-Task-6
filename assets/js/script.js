// grabbing Elements
let submitBtn = document.querySelector(".btn");
let inputTag = document.getElementById("input-city");
let wind = document.querySelector(".wind");
let weatherCard = document.querySelector(".weather-card");

// Creating Object for weather api link and key 
let weatherApi = {
    key: "369d9632fac18756245f003614f7cdb2",
    url: "https://api.openweathermap.org/data/2.5/weather",
};

// Function to get weather Resport
function getWeatherReport(city){ 
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    fetch(`${weatherApi.url}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => weather.json())
    .then(showWeatherReport)
    .catch(error => `Oops Some Error Occured`);
}

// Function to Show Weather Report on DOM
function showWeatherReport(weather){
    console.log(weather);
    
    // grabbing elements
    let cityName = document.querySelector(".city-name");
    cityName.innerHTML = `${weather.name}`;
    let temperature = document.querySelector(".temperature");
    temperature.innerHTML = Math.floor(`${weather.main.temp}`);

    let weatherCondition = document.querySelector(".weather-condition");
    weatherCondition.innerHTML = `${weather.weather[0].main}`;
    
    
    if(`${weather.weather[0].main}`=== "Haze" ){
        wind.classList = "wind fas fa-smog";
        weatherCard.style.backgroundImage = url("../images/wind.jpg");
    }else if(`${weather.weather[0].main}`=== "Smoke"){
        wind.classList = "wind fas fa-smog";
        weatherCard.style.backgroundImage = url("../images/storm.jpg");
    }else if(`${weather.weather[0].main}`=== "Rain"){
        wind.classList = "wind fas fa-cloud-rain";
        weatherCard.style.backgroundImage = url("../images/rain.jpg");
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
    
    if(hours > 12) { hours -=12; }
    if(hours == 00) { hours =12; }

    hours  = (hours < 10) ? "0"+hours : hours;
    minutes  = (minutes < 10) ? "0"+minutes : minutes;
    seconds  = (seconds < 10) ? "0"+seconds : seconds;
    
    let currentTime = `${hours}:${minutes}:${seconds}`;
    let inputTime = document.querySelector(".time");
    inputTime.innerHTML = currentTime;
    setTimeout(time, 1000);
}

// adding Event Listener to Submit Button
submitBtn.addEventListener("click",(e) => {
    e.preventDefault();

    // let inputRegex = /^[a-zA-z]([a-zA-z\s]){2,14}$/;
    let inputValue = inputTag.value.trim();

    getWeatherReport(inputValue);
    date();
    time();
    if(inputValue != ""){
        weatherCard.style.display = "flex";
    }
})






