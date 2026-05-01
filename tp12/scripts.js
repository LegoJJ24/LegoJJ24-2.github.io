const API_KEY = '4c2e62faeamsha4284a146686abcp18c5b3jsn8e597eb359a6';
const API_HOST = 'weatherapi-com.p.rapidapi.com';


const cityEl = document.querySelector('.city');
const dateEl = document.querySelector('.date');
const currentTempEl = document.querySelector('.current-temp');
const conditionIconEl = document.querySelector('.condition-icon');
const conditionTextEl = document.querySelector('.condition-text');
const windSpeedEl = document.getElementById('wind-speed');
const windDirEl = document.getElementById('wind-dir');
const humidityValEl = document.getElementById('humidity-val');
const forecastContainer = document.getElementById('forecast-container');

const modalOverlay = document.getElementById('location-modal');
const changeLocationBtn = document.getElementById('change-location-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');


async function getWeatherData(locationQuery) {
  const url = `https://${API_HOST}/forecast.json?q=${encodeURIComponent(locationQuery)}&days=3`;
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    cityEl.textContent = "Error loading data.";
    alert("Could not fetch weather. Please check your API key and connection.");
  }
}


async function autoLocateAndFetch() {
  try {
    
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    
    
    getWeatherData(ipData.ip);
  } catch (error) {
    console.error("Could not find IP location, defaulting to Pullman:", error);
    
    getWeatherData('Pullman'); 
  }
}


function updateUI(data) {
  cityEl.textContent = `${data.location.name}, ${data.location.region || data.location.country}`;
  
  const dateObj = new Date(data.location.localtime);
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  dateEl.textContent = dateObj.toLocaleDateString('en-US', options);

  currentTempEl.textContent = `${Math.round(data.current.temp_f)}°`;
  
  conditionIconEl.innerHTML = `<img src="https:${data.current.condition.icon}" alt="weather icon">`;
  conditionTextEl.textContent = data.current.condition.text;

  windSpeedEl.textContent = `${data.current.wind_mph} mph ${data.current.wind_dir}`;
  humidityValEl.textContent = `${data.current.humidity}%`;
  windDirEl.style.transform = `rotate(${data.current.wind_degree}deg)`;

  forecastContainer.innerHTML = ''; 
  
  data.forecast.forecastday.forEach(day => {
    const forecastDate = new Date(day.date + 'T00:00:00'); 
    const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });

    const cardHTML = `
      <div class="forecast-card">
        <h4 class="day">${dayName}</h4>
        <img class="forecast-icon" src="https:${day.day.condition.icon}" alt="icon">
        <div class="forecast-stats">
          <span class="forecast-temp-high">${Math.round(day.day.maxtemp_f)}°</span>
          <span class="forecast-temp-low">${Math.round(day.day.mintemp_f)}°</span>
        </div>
      </div>
    `;
    forecastContainer.innerHTML += cardHTML;
  });
}


function openModal() {
  modalOverlay.classList.add('active');
  locationInput.focus();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  locationInput.value = ''; 
}

changeLocationBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

locationForm.addEventListener('submit', (e) => {
  e.preventDefault(); 
  const newLocation = locationInput.value.trim();
  if (newLocation) {
    
    cityEl.textContent = "Searching...";
    getWeatherData(newLocation);
    closeModal();
  }
});


autoLocateAndFetch();
