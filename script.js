// Initialiser la carte
let map = L.map('map').setView([48.866667, 2.333333], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let marker = null;

function getWeather() {
    const cityInput = document.getElementById('city-input');
    const weatherInfo = document.getElementById('weather-info');
    const city = cityInput.value.trim();

    if (!city) {
        alert('Veuillez entrer une ville');
        return;
    }

    // Simulation des coordonnées (dans un vrai projet, utilisez une API de géocodage)
    const lat = 48.866667 + (Math.random() - 0.5) * 10;
    const lon = 2.333333 + (Math.random() - 0.5) * 10;

    // Mettre à jour la carte
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker([lat, lon]).addTo(map);
    map.setView([lat, lon], 10);

    // Simulation des données météo
    const weatherData = {
        temperature: Math.floor(Math.random() * 30),
        condition: ['Ensoleillé', 'Nuageux', 'Pluvieux', 'Venteux'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 100),
        windSpeed: Math.floor(Math.random() * 50),
        pressure: Math.floor(Math.random() * 100) + 950,
        feelsLike: Math.floor(Math.random() * 30)
    };

    const getWeatherIcon = (condition) => {
        const icons = {
            'Ensoleillé': 'fa-sun',
            'Nuageux': 'fa-cloud',
            'Pluvieux': 'fa-cloud-rain',
            'Venteux': 'fa-wind'
        };
        return icons[condition] || 'fa-sun';
    };

    // Afficher les informations météo
    weatherInfo.innerHTML = `
        <h2>${city}</h2>
        <i class="fas ${getWeatherIcon(weatherData.condition)} weather-icon"></i>
        <div class="temperature">${weatherData.temperature}°C</div>
        <div class="condition">${weatherData.condition}</div>
        <div class="weather-details">
            <div class="weather-detail-item">
                <i class="fas fa-temperature-low"></i>
                <span>Ressenti: ${weatherData.feelsLike}°C</span>
            </div>
            <div class="weather-detail-item">
                <i class="fas fa-tint"></i>
                <span>Humidité: ${weatherData.humidity}%</span>
            </div>
            <div class="weather-detail-item">
                <i class="fas fa-wind"></i>
                <span>Vent: ${weatherData.windSpeed} km/h</span>
            </div>
            <div class="weather-detail-item">
                <i class="fas fa-compress-arrows-alt"></i>
                <span>Pression: ${weatherData.pressure} hPa</span>
            </div>
        </div>
    `;

    // Générer les prévisions pour les 5 prochains jours
    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = '';
    
    for(let i = 1; i <= 5; i++) {
        const temp = Math.floor(Math.random() * 30);
        const condition = ['Ensoleillé', 'Nuageux', 'Pluvieux', 'Venteux'][Math.floor(Math.random() * 4)];
        
        forecastContainer.innerHTML += `
            <div class="forecast-item">
                <div>J+${i}</div>
                <i class="fas ${getWeatherIcon(condition)}"></i>
                <div>${temp}°C</div>
            </div>
        `;
    }
}

// Gérer la recherche avec la touche Enter
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});