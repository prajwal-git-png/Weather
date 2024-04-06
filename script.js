document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'bd3c3805d8eb8527a4f4af904144306a'; 

    const searchInput = document.querySelector('.search input');
    const searchButton = document.querySelector('.search button');
    const weatherIcon = document.querySelector('.weather-icon');
    const temp = document.querySelector('.temp');
    const city = document.querySelector('.city');
    const humidity = document.querySelector('.humidity');
    const wind = document.querySelector('.wind');

    searchButton.addEventListener('click', function() {
        const cityName = searchInput.value.trim();
        if(cityName !== '') {
            fetchWeather(cityName);
        }
    });

    function fetchWeather(cityName) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                updateWeather(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    function updateWeather(data) {
        const weatherDescription = data.weather[0].main;
        const weatherIconCode = data.weather[0].icon;
        const temperature = Math.round(data.main.temp - 273.15);
        const cityName = data.name;
        const humidityValue = data.main.humidity;
        const windSpeed = data.wind.speed;

        // weatherIcon.src = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
        switch (data.weather[0].main) {
            case 'Clear':
                weatherIcon.src = './images/clear.png';
                break;
            case 'Rain':
                weatherIcon.src = './images/rain.png';
                break;
            case 'Clouds':
                weatherIcon.src = './images/clouds.png';
                break;
            case 'Thunderstorm':
                weatherIcon.src = './images/thunderstorm.png';  
                break;
            case 'Drizzle':
                weatherIcon.src = './images/drizzle.png';
                break;
            case 'Snow':
                weatherIcon.src = './images/snow.png';
                break;
            case 'Mist':
                weatherIcon.src = './images/mist.png';
                break;
            case 'Fog':
                weatherIcon.src = './images/fog.png';     
                break;
            case 'Haze':
                weatherIcon.src = './images/haze.png';         
                break;
            case 'Smoke':
                weatherIcon.src = './images/smoke.png';     
                break;
            // Add more cases for other weather conditions as needed
            default:
                weatherIcon.src = './images/def.png';
        }
        
        temp.textContent = `${temperature}°C`;
        city.textContent = cityName;
        humidity.textContent = `${humidityValue}%`;
        wind.textContent = `${windSpeed} km/h`;
    }
});
