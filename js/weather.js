const api = {
    key: "cb1437b6f56e574ea5f69478397d5c98",
    base: "https://api.openweathermap.org/data/2.5/"
  };

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);