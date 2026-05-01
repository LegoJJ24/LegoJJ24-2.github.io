
const API_KEY = 'YOUR_RAPID_API_KEY';
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


async function getWeatherData(location) {
  const url = `https://${API_HOST}/forecast.json?q=${encodeURIComponent(location)}&days=3`;
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error('Weather data not found');
    
    const data = await response.json();
    updateUI(data);
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Could not fetch weather for that location. Please try again.");
  }
}


function updateUI(data) {

  cityEl.textContent = `${data.location.name}, ${data.location.region || data.location.country}`;
  
  
  const dateObj = new Date(data.location.localtime);
  const options = { weekday: 'long', month: 'short', day: 'numeric' };
  dateEl.textContent = dateObj.toLocaleDateString('en-US', options);

  currentTempEl.textContent = `${Math.round(data.current.temp_f)}°F`;
  
  
  conditionIconEl.innerHTML = `<img src="https:${data.current.condition.icon}" alt="weather icon" width="64" height="64">`;
  conditionTextEl.textContent = data.current.condition.text;

  windSpeedEl.textContent = `${data.current.wind_mph} mph ${data.current.wind_dir}`;
  humidityValEl.textContent = `${data.current.humidity}%`;
  
  
  windDirEl.style.transform = `rotate(${data.current.wind_degree}deg)`;

 
  forecastContainer.innerHTML = ''; 
  
  data.forecast.forecastday.forEach(day => {
    // Get day name
    const forecastDate = new Date(day.date + 'T00:00:00'); 
    const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });

    // Create the HTML for the card. 
    // Note: The API doesn't give daily wind direction, only max wind speed, which aligns with your assignment guidelines.
    const cardHTML = `
      <div class="forecast-card">
        <h4 class="day">${dayName}</h4>
        <div class="forecast-icon">
          <img src="https:${day.day.condition.icon}" alt="icon" width="48" height="48">
        </div>
        <p class="forecast-condition">${day.day.condition.text}</p>
        <div class="forecast-stats">
          <span class="forecast-temp">${Math.round(day.day.mintemp_f)}° / ${Math.round(day.day.maxtemp_f)}°F</span>
          <span class="forecast-wind">${Math.round(day.day.maxwind_mph)} mph</span>
        </div>
      </div>
    `;
    
    forecastContainer.innerHTML += cardHTML;
  });
}

// --- Modal Event Listeners ---

function openModal() {
  modalOverlay.classList.add('active');
  locationInput.focus();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  locationInput.value = ''; // clear input
}

changeLocationBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Close modal if user clicks outside the modal content box
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Handle form submission
locationForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  const newLocation = locationInput.value.trim();
  
  if (newLocation) {
    getWeatherData(newLocation);
    closeModal();
  }
});

// --- Initialization ---
// Load default location on startup
getWeatherData('Pullman');
