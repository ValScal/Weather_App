// check key url https://api.openweathermap.org/data/2.5/weather?q=aci+castello&appid=8fdc8599e79e8877d065ee711248d62d

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const BASE_URL_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = "8fdc8599e79e8877d065ee711248d62d";

// START SELECT
const municipCataniaArr = [
  { name: "Choose a location", value: "choose+location" },
  { name: "Aci Bonaccorsi", value: "aci+bonaccorsi" },
  { name: "Aci Castello", value: "aci+castello" },
  { name: "Aci Catena", value: "aci+catena" },
  { name: "Aci Sant'Antonio", value: "aci+santantonio" },
  { name: "Acireale", value: "acireale" },
  { name: "Adrano", value: "adrano" },
  { name: "Belpasso", value: "belpasso" },
  { name: "Biancavilla", value: "biancavilla" },
  { name: "Bronte", value: "bronte" },
  { name: "Calatabiano", value: "calatabiano" },
  { name: "Caltagirone", value: "caltagirone" },
  { name: "Camporotondo Etneo", value: "camporotondo+etneo" },
  { name: "Castel di Iudica", value: "castel+di+iudica" },
  { name: "Castiglione di Sicilia", value: "castiglione+di+sicilia" },
  { name: "Catania", value: "catania" },
  { name: "Fiumefreddo", value: "fiumefreddo" },
  { name: "Giarre", value: "giarre" },
  { name: "Grammichele", value: "grammichele" },
  { name: "Gravina di Catania", value: "gravina+di+catania" },
  { name: "Licodia Eubea", value: "licodia+eubea" },
  { name: "Linguaglossa", value: "linguaglossa" },
  { name: "Maletto", value: "maletto" },
  { name: "Maniace", value: "maniace" },
  { name: "Mascali", value: "mascali" },
  { name: "Mascalucia", value: "mascalucia" },
  { name: "Mazzarrone", value: "mazzarrone" },
  { name: "Militello in Val di Catania", value: "militello+in+val+di+catania" },
  { name: "Milo", value: "milo" },
  { name: "Mineo", value: "mineo" },
  { name: "Mirabella Imbaccari", value: "mirabella+imbaccari" },
  { name: "Misterbianco", value: "misterbianco" },
  { name: "Motta Sant'Anastasia", value: "motta+santanastasia" },
  { name: "Nicolosi", value: "nicolosi" },
  { name: "Palagonia", value: "palagonia" },
  { name: "Paternò", value: "paterno" },
  { name: "Pedara", value: "pedara" },
  { name: "Piedimonte Etneo", value: "piedimonte+etneo" },
  { name: "Raddusa", value: "raddusa" },
  { name: "Ragalna", value: "ragalna" },
  { name: "Ramacca", value: "ramacca" },
  { name: "Randazzo", value: "randazzo" },
  { name: "Riposto", value: "riposto" },
  { name: "San Cono", value: "san+cono" },
  { name: "San Giovanni la Punta", value: "san+giovanni+la+punta" },
  { name: "San Gregorio di Catania", value: "san+gregorio+di+catania" },
  { name: "San Michele di Ganzaria", value: "san+michele+di+ganzaria" },
  { name: "San Pietro Clarenza", value: "san+pietro+clarenza" },
  { name: "Santa Maria di Licodia", value: "santa+maria+di+licodia" },
  { name: "Santa Venerina", value: "santa+venerina" },
  { name: "Sant'Agata Li Battiati", value: "santagata+li+battiati" },
  { name: "Sant'Alfio", value: "santalfio" },
  { name: "Scordia", value: "scordia" },
  { name: "Trecastagni", value: "trecastagni" },
  { name: "Tremestieri Etneo", value: "tremestieri+etneo" },
  { name: "Valverde", value: "valverde" },
  { name: "Viagrande", value: "viagrande" },
  { name: "Vizzini", value: "vizzini" },
  { name: "Zafferana Etnea", value: "zafferana+etnea" },
];

const selectId = "cities";

const municipSelectElGen = (selectId) => {
  const selectWrapperEl = document.createElement("div");
  const labelEl = document.createElement("label");
  const selectEl = document.createElement("select");

  selectWrapperEl.className = "select-wrapper";
  labelEl.htmlFor = selectId;
  labelEl.textContent = "Choose a city";
  selectEl.id = selectId;
  selectEl.name = selectId;

  selectWrapperEl.append(labelEl, selectEl);

  return selectWrapperEl;
};

const selectWrapperEl = municipSelectElGen(selectId);
const selectEl = selectWrapperEl.querySelector("select");

municipCataniaArr.forEach((city) => {
  const selOption = document.createElement("option");
  selOption.value = city.value;
  selOption.text = city.name;
  selectEl.add(selOption);
});

selectEl.addEventListener("change", (e) => {
  let city = e.target.value;
  
  displayHourlyForecast(city);
  fetch(`${BASE_URL}?q=${e.target.value}&appid=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      showWeatherInfoSel(data);
    })
    .catch((error) => {
      console.error(error);
      alert("Sorry, cannot find current weather data. Please try again.");
    });
});
// END SELECT

const selectContainerHtmlEl = document.getElementById("select-container");
selectContainerHtmlEl.append(selectEl);

function showWeatherInfoSel(data) {
  const mainTempDivEl = document.getElementById("main-temp");
  const weatherInfoDivEl = document.getElementById("weather-info");
  const weatherIconDivEl = document.getElementById("weather-icon");
  const minTempDivEl = document.getElementById("min-temp");
  const maxTempDivEl = document.getElementById("max-temp");
  const humidityDivEl = document.getElementById("humidity");
  const windSpeedDivEl = document.getElementById("wind-speed");
  const weatherForecastDivEl = document.getElementById("hourly-forecast");

  // Clear previous content to make room for new information
  weatherInfoDivEl.innerHTML = "";
  weatherForecastDivEl.innerHTML = "";
  mainTempDivEl.innerHTML = "";
  minTempDivEl.innerHTML = "";
  maxTempDivEl.innerHTML = "";
  humidityDivEl.innerHTML = "";
  windSpeedDivEl.innerHTML = "";

  if (data.cod === "404") {
    weatherInfoDivEl.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
    const minTemp = Math.round(data.main.temp_min - 273.15); // Convert to Celsius
    const maxTemp = Math.round(data.main.temp_max - 273.15); // Convert to Celsius
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;

    const minTempHTML = `<span><i class="fa-solid fa-temperature-arrow-down"></i> Min: ${minTemp}°C  |</span>  `;
    const maxTempHTML = `<span><i class="fa-solid fa-temperature-arrow-up"></i> Max: ${maxTemp}°C</span>`;

    const windSpeedHTML = `<p><i class="fa-solid fa-wind"></i> Wind speed: ${windSpeed} km/h</p>`;
    const humidityHTML = `<p><i class="fa-solid fa-droplet"></i> Humidity: ${humidity}%</p>`;

    const weatherInfoHTML = `
          <p>${cityName}</p>
          <p>${description}</p>
      `;

    mainTempDivEl.innerHTML = temperatureHTML;
    minTempDivEl.innerHTML = minTempHTML;
    maxTempDivEl.innerHTML = maxTempHTML;
    humidityDivEl.innerHTML = humidityHTML;
    weatherInfoDivEl.innerHTML = weatherInfoHTML;
    windSpeedDivEl.innerHTML = windSpeedHTML;
    weatherIconDivEl.src = iconUrl;
    weatherIconDivEl.alt = description;

    changeBackground(description.toLowerCase());

    showImage();
  }
}

function changeBackground(weatherCondition) {
  const body = document.body;

  // Background change by weather condition
  switch (weatherCondition) {
    case "clear sky":
      body.style.backgroundImage = "url('./images/clear-sky.jpg')";
      break;
    case "few clouds":
    case "scattered clouds":
    case "broken clouds":
    case "overcast clouds":
      body.style.backgroundImage = "url('./images/cloudy.jpg')";
      break;
    case "light rain":
    case "moderate rain":
    case "heavy intensity rain":
      body.style.backgroundImage = "url('./images/rain.jpg')";
      break;
    case "snow":
      body.style.backgroundImage = "url('./images/snow.jpg')";
      break;

    default:
      // Default background if the condition is not managed
      body.style.background = "";
  }
}

function displayHourlyForecast(e) {
  // const cityName = e.target.value;

  fetch(`${BASE_URL_FORECAST}?q=${e}&appid=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      const hourlyForecastDiv = document.getElementById("hourly-forecast");
      hourlyForecastDiv.innerHTML = ""; 

      const hourlyForecasts = data.list.slice(0, 8);

      hourlyForecasts.forEach((hourlyForecasts) => {
        const hour = new Date(hourlyForecasts.dt * 1000).getHours(); 
        const temperature = Math.round(hourlyForecasts.main.temp - 273.15);
        const humidity = hourlyForecasts.main.humidity;
        const iconCode = hourlyForecasts.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const forecastHTML = `
          <div class="forecast-item">
            <p class="f-hour"><i class="fa-solid fa-clock"></i> ${hour}:00</p>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <p class="f-temp-hum">
              <span class="f-temp"><i class="fa-solid fa-temperature-half"></i> ${temperature}°C</span>
              <span class="f-hum"><i class="fa-solid fa-droplet"></i> ${humidity}%</span></p>
          </div>`;

        hourlyForecastDiv.innerHTML += forecastHTML;
      });

    })
    .catch((error) => console.error("Errore nella richiesta API:", error));
}

function showImage() {
  // iconImgEl
  const weatherIconDivEl = document.getElementById("weather-icon");
  weatherIconDivEl.style.display = "block"; // Make the image visible once it's loaded
}
