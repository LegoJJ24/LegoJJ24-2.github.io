const API_KEY = '4c2e62faeamsha4284a146686abcp18c5b3jsn8e597eb359a6';
const API_HOST = 'weatherapi-com.p.rapidapi.com';

// UI Elements
const cityEl = document.querySelector('.city');
const dateEl = document.querySelector('.date');
const currentTempEl = document.querySelector('.current-temp');
const conditionIconEl = document.querySelector('.condition-icon');
const conditionTextEl = document.querySelector('.condition-text');
const windSpeedEl = document.getElementById('wind-speed');
const windDirEl = document.getElementById('wind-dir');
const humidityValEl = document.getElementById('humidity-val');
const forecastContainer = document.getElementById('forecast-container');
const hourlyContainer = document.getElementById('hourly-container');
const recentSelect = document.getElementById('recent-locations-select');

// Interaction Elements
const modalOverlay = document.getElementById('location-modal');
const changeLocationBtn = document.getElementById('change-location-btn');
const localWeatherBtn = document.getElementById('local-weather-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');

// --- 1. GEOLOCATION & INITIAL LOAD ---

async function autoLocateAndFetch() {
  cityEl.textContent = "Locating...";
  
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const query = `${position.coords.latitude},${position.coords.longitude}`;
        getWeatherData(query);
      },
      async (error) => {
        console.warn("GPS failed, trying IP fallback...", error);
        fallbackToIP();
      }
    );
  } else {
    fallbackToIP();
  }
}

async function fallbackToIP() {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
    getWeatherData(ipData.ip);
  } catch (err) {
    getWeatherData('Pullman'); // Default fallback
  }
}

// --- 2. DATA FETCHING ---

async function getWeatherData(locationQuery) {
  const url = `https://${API_HOST}/forecast.json?q=${encodeURIComponent(locationQuery)}&days=3`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST }
    });
    if (!response.ok) throw new Error("API Failure");
    
    const data = await response.json();
    updateUI(data);
    saveToHistory(data.location.name);
  } catch (error) {
    cityEl.textContent = "Error.";
    alert("Could not load weather data.");
  }
}

// --- 3. UI UPDATE (HOURLY + DAILY) ---

function updateUI(data) {
  cityEl.textContent = `${data.location.name}, ${data.location.region || data.location.country}`;
  
  const dateObj = new Date(data.location.localtime);
  dateEl.textContent = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  currentTempEl.textContent = `${Math.round(data.current.temp_f)}°`;
  conditionIconEl.innerHTML = `<img src="https:${data.current.condition.icon}" alt="icon">`;
  conditionTextEl.textContent = data.current.condition.text;
  windSpeedEl.textContent = `${data.current.wind_mph} mph ${data.current.wind_dir}`;
  humidityValEl.textContent = `${data.current.humidity}%`;
  windDirEl.style.transform = `rotate(${data.current.wind_degree}deg)`;

  // Render Hourly (72 Hours)
  hourlyContainer.innerHTML = '';
  data.forecast.forecastday.forEach(day => {
    day.hour.forEach(h => {
      const time = new Date(h.time).getHours();
      const ampm = time >= 12 ? 'PM' : 'AM';
      const displayHour = time % 12 || 12;

      const hourDiv = document.createElement('div');
      hourDiv.className = 'hourly-item';
      hourDiv.innerHTML = `
        <p class="hourly-time">${displayHour}${ampm}</p>
        <img src="https:${h.condition.icon}" width="30">
        <p class="hourly-temp">${Math.round(h.temp_f)}°</p>
      `;
      hourlyContainer.appendChild(hourDiv);
    });
  });

  // Render 3-Day Summary
  forecastContainer.innerHTML = '';
  data.forecast.forecastday.forEach(day => {
    const dayName = new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' });
    forecastContainer.innerHTML += `
      <div class="forecast-card">
        <h4>${dayName}</h4>
        <img src="https:${day.day.condition.icon}" width="40">
        <div class="forecast-stats">
          <span>${Math.round(day.day.maxtemp_f)}°</span>
          <span style="opacity:0.6">${Math.round(day.day.mintemp_f)}°</span>
        </div>
      </div>`;
  });
}

// --- 4. COOKIE & HISTORY MANAGEMENT ---

function saveToHistory(cityName) {
  let history = getCookie("weatherHistory") ? JSON.parse(getCookie("weatherHistory")) : [];
  
  // Filter out the city if it exists, then add to front
  history = history.filter(c => c !== cityName);
  history.unshift(cityName);
  
  // Keep only last 5
  if (history.length > 5) history.pop();
  
  setCookie("weatherHistory", JSON.stringify(history), 7);
  renderHistoryDropdown(history);
}

function renderHistoryDropdown(history) {
  recentSelect.innerHTML = '<option value="" disabled selected>Recent Locations</option>';
  history.forEach(city => {
    const opt = document.createElement('option');
    opt.value = city;
    opt.textContent = city;
    recentSelect.appendChild(opt);
  });
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// --- 5. EVENT LISTENERS ---

recentSelect.addEventListener('change', (e) => {
  if (e.target.value) getWeatherData(e.target.value);
});

localWeatherBtn.addEventListener('click', autoLocateAndFetch);

changeLocationBtn.addEventListener('click', () => modalOverlay.classList.add('active'));
closeModalBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));

locationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeatherData(locationInput.value.trim());
  modalOverlay.classList.remove('active');
  locationInput.value = '';
});

// Init
const existingHistory = getCookie("weatherHistory") ? JSON.parse(getCookie("weatherHistory")) : [];
renderHistoryDropdown(existingHistory);
autoLocateAndFetch();
