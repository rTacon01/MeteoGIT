// Initialiser la carte
let map = L.map('map').setView([48.866667, 2.333333], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let marker = null;

// 1. RECHERCHE PAR CLIC SUR LA CARTE
map.on('click', async function(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    
    // Mettre à jour le marqueur
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker([lat, lon]).addTo(map);
    
    try {
        // Obtenir le nom de la ville depuis les coordonnées
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        const cityName = data.address.city || data.address.town || data.address.village || "Lieu inconnu";
        
        // Afficher la météo pour cette localisation
        displayWeather(cityName, lat, lon);
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la récupération des informations de la ville');
    }
});

// 2. RECHERCHE PAR NOM DE VILLE
async function searchCity() {
    const cityInput = document.getElementById('city-input');
  
    const city = cityInput.value.trim();

    if (!city) {
        alert('Veuillez entrer une ville');
        return;
    }
  
    try {
        // Obtenir les coordonnées depuis le nom de la ville
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
        const data = await response.json();
        
        if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            
            // Mettre à jour la carte
            if (marker) {
                map.removeLayer(marker);
            }
            marker = L.marker([lat, lon]).addTo(map);
            map.setView([lat, lon], 10);
            
            // Afficher la météo
            displayWeather(city, lat, lon);
        } else {
            alert('Ville non trouvée');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la recherche de la ville');
    }
}

// Fonction commune pour afficher la météo
function displayWeather(city, lat, lon) {
    const weatherInfo = document.getElementById('weather-info');

    // Simulation des données météo (à remplacer par une vraie API météo)

    const weatherData = {
        temperature: Math.floor(Math.random() * 30),
        condition: ['Ensoleillé', 'Nuageux', 'Pluvieux', 'Venteux'][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 100),
        windSpeed: Math.floor(Math.random() * 50),
        pressure: Math.floor(Math.random() * 100) + 950,
        feelsLike: Math.floor(Math.random() * 30)
    };
  
    // Déterminer l'icône météo
    const weatherIcons = {
        'Ensoleillé': 'fa-sun',
        'Nuageux': 'fa-cloud',
        'Pluvieux': 'fa-cloud-rain',
        'Venteux': 'fa-wind'
    };

    // Afficher les informations
    weatherInfo.innerHTML = `
        <h2>${city}</h2>
        <div class="coordinates">
            <span>Latitude: ${lat.toFixed(4)}°</span>
            <span>Longitude: ${lon.toFixed(4)}°</span>
        </div>
        <i class="fas ${weatherIcons[weatherData.condition] || 'fa-sun'} weather-icon"></i>
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

    // Afficher les prévisions
    displayForecast();
}

// Fonction pour afficher les prévisions
function displayForecast() {
    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = '';
    
    // Simuler 5 jours de prévisions
    for(let i = 1; i <= 5; i++) {
        const temp = Math.floor(Math.random() * 30);
        const condition = ['Ensoleillé', 'Nuageux', 'Pluvieux', 'Venteux'][Math.floor(Math.random() * 4)];
        const icon = {
            'Ensoleillé': 'fa-sun',
            'Nuageux': 'fa-cloud',
            'Pluvieux': 'fa-cloud-rain',
            'Venteux': 'fa-wind'
        }[condition];
        
        forecastContainer.innerHTML += `
            <div class="forecast-item">
                <div>J+${i}</div>
                <i class="fas ${icon}"></i>
                <div>${temp}°C</div>
            </div>
        `;
    }
}

// Gérer la recherche avec la touche Enter
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchCity();
    }
});

// Gérer le clic sur le bouton de recherche
document.querySelector('button').onclick = searchCity;