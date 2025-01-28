const API_KEY = "e030eb77d12971243730006d3454f391"

const map = L.map('map').setView([46.603354, 1.888334], 6);

// Ajouter une couche de base (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Ajouter la couche des nuages
const cloudLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`, {
    attribution: '&copy; OpenWeatherMap'
}).addTo(map);

const precipitationLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`);
const temperatureLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${API_KEY}`);
const windLayer = L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${API_KEY}`);

const baseLayers = {
    "Nuages": cloudLayer,
    "Précipitations": precipitationLayer,
    "Température": temperatureLayer,
    "Vent": windLayer
};

// Ajouter un contrôle pour basculer entre les couches
L.control.layers(baseLayers).addTo(map);