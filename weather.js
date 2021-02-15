const weather = document.querySelector(".js-weather");

var statusmsg;

const WEATHER_API_KEY = "e98ea2051553e4a8f33f31218a26dede";
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            const weatherStatus = json.weather[0].description;
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${Math.round(temperature)}℃ @${place}`;
            getBackground(weatherStatus);
        });
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("현재 위치를 찾을 수 없습니다.");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
