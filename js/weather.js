const api = {
  key: "49a1e155ccd390da2017f2bbe25c3a42",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current-temp .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let curr_weather = document.querySelector(".current-temp .weather");
  curr_weather.innerText = weather.weather[0].main;

  let curr_high_low = document.querySelector(".current-temp .high-low");
  curr_high_low.innerText = `Low: ${weather.main.temp_min}°C / High: ${weather.main.temp_max}°C`;

  let background_img = document.querySelector("body");
  if(weather.weather[0].icon == "01d"){
    background_img.style.backgroundImage = "url(../images/clear_day.jpg)"
  }
  else if(weather.weather[0].icon == "01n"){
    background_img.style.backgroundImage = "url(../images/clear_night.jpg)"
  }
  else if(weather.weather[0].icon == "02d"){
    background_img.style.backgroundImage = "url(../images/few_clouds_day.jpg)"
  }
  else if(weather.weather[0].icon == "02n"){
    background_img.style.backgroundImage = "url(../images/few_clouds_night.jpg)"
  }
  else if(weather.weather[0].icon == "03d" || weather.weather[0].icon == "03n" || weather.weather[0].icon == "04d" || weather.weather[0].icon == "04n"){
    background_img.style.backgroundImage = "url(../images/broken_clouds.jpg)"
  }
  else if(weather.weather[0].icon == "09d" || weather.weather[0].icon == "09n"){
    background_img.style.backgroundImage = "url(../images/shower_rain.jpg)"
  }
  else if(weather.weather[0].icon == "10d" || weather.weather[0].icon == "10n"){
    background_img.style.backgroundImage = "url(../images/rain.jpg)"
  }
  else if(weather.weather[0].icon == "11d" || weather.weather[0].icon == "11n"){
    background_img.style.backgroundImage = "url(../images/thunderstrom.jpg)"
  }
  else if(weather.weather[0].icon == "13d" || weather.weather[0].icon == "13n"){
    background_img.style.backgroundImage = "url(../images/snow.jpg)"
  }
  else if(weather.weather[0].icon == "50d" || weather.weather[0].icon == "50n"){
    background_img.style.backgroundImage = "url(../images/mist.jpg)"
  }
  else{
    background_img.style.backgroundImage = "url(../images/background-img.jpg)"
  }
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}