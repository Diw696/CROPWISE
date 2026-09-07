// Storage for users (in a real app, this would be a database)
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// Seed a default admin account on first run so there's always a way in
if (!users.some(user => user.username === 'admin')) {
    users.push({ username: 'admin', password: 'admin987' });
    localStorage.setItem('users', JSON.stringify(users));
}

// ============ INDIAN CITIES DATABASE ============

const indianCities = [
    // Major Metropolitan Cities
    { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lon: 72.8777 },
    { name: 'Delhi', state: 'Delhi', lat: 28.7041, lon: 77.1025 },
    { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lon: 77.5946 },
    { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lon: 78.4867 },
    { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707 },
    { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lon: 88.3639 },
    { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lon: 73.8567 },
    { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lon: 72.5714 },
    { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lon: 75.7873 },
    { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lon: 80.9462 },
    
    // Tier 2 Cities
    { name: 'Surat', state: 'Gujarat', lat: 21.1702, lon: 72.8311 },
    { name: 'Chandigarh', state: 'Chandigarh', lat: 30.7333, lon: 76.7794 },
    { name: 'Kochi', state: 'Kerala', lat: 9.9312, lon: 76.2673 },
    { name: 'Vadodara', state: 'Gujarat', lat: 22.3072, lon: 73.1812 },
    { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lon: 75.8577 },
    { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lon: 79.0882 },
    { name: 'Gurgaon', state: 'Haryana', lat: 28.4595, lon: 77.0266 },
    { name: 'Noida', state: 'Uttar Pradesh', lat: 28.5355, lon: 77.3910 },
    { name: 'Thane', state: 'Maharashtra', lat: 19.2183, lon: 72.9781 },
    { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6869, lon: 83.2185 },
    
    // Tier 3 Cities & Districts
    { name: 'Aurangabad', state: 'Maharashtra', lat: 19.8762, lon: 75.3433 },
    { name: 'Nashik', state: 'Maharashtra', lat: 19.9975, lon: 73.7898 },
    { name: 'Amritsar', state: 'Punjab', lat: 31.6340, lon: 74.8723 },
    { name: 'Ludhiana', state: 'Punjab', lat: 30.9010, lon: 75.8573 },
    { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lon: 80.3319 },
    { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lon: 78.0081 },
    { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3201, lon: 82.9856 },
    { name: 'Udaipur', state: 'Rajasthan', lat: 24.5854, lon: 73.7125 },
    { name: 'Jodhpur', state: 'Rajasthan', lat: 26.2389, lon: 73.0243 },
    { name: 'Bikaner', state: 'Rajasthan', lat: 28.0229, lon: 71.8315 },
    { name: 'Guwahati', state: 'Assam', lat: 26.1445, lon: 91.7362 },
    { name: 'Patna', state: 'Bihar', lat: 25.5941, lon: 85.1376 },
    { name: 'Ranchi', state: 'Jharkhand', lat: 23.3441, lon: 85.3096 },
    { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.1815, lon: 79.9864 },
    { name: 'Jabalpur', state: 'Madhya Pradesh', lat: 23.1815, lon: 79.9864 },
    { name: 'Coimbatore', state: 'Tamil Nadu', lat: 11.0026, lon: 76.6755 },
    { name: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lon: 78.1198 },
    { name: 'Salem', state: 'Tamil Nadu', lat: 11.6643, lon: 78.1460 },
    { name: 'Thiruvananthapuram', state: 'Kerala', lat: 8.5241, lon: 76.9366 },
    { name: 'Kottayam', state: 'Kerala', lat: 9.5941, lon: 76.5214 },
    { name: 'Thrissur', state: 'Kerala', lat: 10.5276, lon: 76.2144 },
    { name: 'Belgaum', state: 'Karnataka', lat: 15.8497, lon: 75.6499 },
    { name: 'Mangalore', state: 'Karnataka', lat: 12.8656, lon: 74.8445 },
    { name: 'Mysore', state: 'Karnataka', lat: 12.2958, lon: 76.6394 },
    { name: 'Goa', state: 'Goa', lat: 15.2993, lon: 73.8243 },
    { name: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lon: 85.8245 },
    { name: 'Cuttack', state: 'Odisha', lat: 20.4625, lon: 85.8830 },
    { name: 'Raipur', state: 'Chhattisgarh', lat: 21.2514, lon: 81.6296 },
    { name: 'Gwalior', state: 'Madhya Pradesh', lat: 26.2389, lon: 78.1770 },
    { name: 'Srinagar', state: 'Jammu & Kashmir', lat: 34.0837, lon: 74.7973 },
    { name: 'Jammu', state: 'Jammu & Kashmir', lat: 32.7266, lon: 75.5763 },
    { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.7751, lon: 77.1831 },
    { name: 'Dehradun', state: 'Uttarakhand', lat: 30.3165, lon: 78.0322 },
    { name: 'Jhansi', state: 'Uttar Pradesh', lat: 25.4358, lon: 78.5714 },
    { name: 'Meerut', state: 'Uttar Pradesh', lat: 29.0080, lon: 77.7064 },
    { name: 'Bareilly', state: 'Uttar Pradesh', lat: 28.3671, lon: 79.4304 },
    { name: 'Aligarh', state: 'Uttar Pradesh', lat: 27.8974, lon: 77.8934 },
];

// ============ PAGE NAVIGATION ============

function togglePages(page) {
    document.getElementById('signupPage').classList.remove('active');
    document.getElementById('signinPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.remove('active');

    if (page === 'signup') {
        document.getElementById('signupPage').classList.add('active');
    } else if (page === 'signin') {
        document.getElementById('signinPage').classList.add('active');
    } else if (page === 'dashboard') {
        document.getElementById('dashboardPage').classList.add('active');
    }
}

// ============ SIGN UP LOGIC ============

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;

    // Clear previous errors
    clearErrors('signup');

    // Validation
    if (!username) {
        showError('signupUsername', 'Username is required');
        return;
    }

    if (username.length < 3) {
        showError('signupUsername', 'Username must be at least 3 characters');
        return;
    }

    if (!password) {
        showError('signupPassword', 'Password is required');
        return;
    }

    if (password.length < 6) {
        showError('signupPassword', 'Password must be at least 6 characters');
        return;
    }

    // Check if username already exists
    if (users.some(user => user.username === username)) {
        showError('signupUsername', 'Username already exists');
        return;
    }

    // Save new user
    users.push({
        username: username,
        password: password
    });

    localStorage.setItem('users', JSON.stringify(users));

    // Show success message
    alert('Account created successfully! Redirecting to Sign In...');

    // Clear form and redirect to signin
    document.getElementById('signupForm').reset();
    togglePages('signin');
});

// ============ SIGN IN LOGIC ============

document.getElementById('signinForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('signinUsername').value.trim();
    const password = document.getElementById('signinPassword').value;

    // Clear previous errors
    clearErrors('signin');

    // Validation
    if (!username) {
        showError('signinUsername', 'Username is required');
        return;
    }

    if (!password) {
        showError('signinPassword', 'Password is required');
        return;
    }

    // Check credentials
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        showError('signinUsername', 'Invalid username or password');
        return;
    }

    // Save current user and redirect to dashboard
    currentUser = username;
    localStorage.setItem('currentUser', currentUser);
    document.getElementById('userDisplay').textContent = currentUser;
    document.getElementById('signinForm').reset();
    togglePages('dashboard');
});

// ============ LOGOUT LOGIC ============

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    document.getElementById('signupForm').reset();
    document.getElementById('signinForm').reset();
    togglePages('signup');
}

// ============ HELPER FUNCTIONS ============

function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = inputElement.parentElement.querySelector('.error-message');
    errorElement.textContent = message;
    inputElement.style.borderColor = '#e74c3c';
}

function clearErrors(formType) {
    const formPrefix = formType === 'signup' ? 'signup' : 'signin';
    const inputs = document.querySelectorAll(`[id^="${formPrefix}"]`);

    inputs.forEach(input => {
        if (input.type === 'text' || input.type === 'password') {
            input.style.borderColor = '#e0e0e0';
            const errorElement = input.parentElement.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
    });
}

// ============ LOCATION SEARCH FUNCTIONS ============

function showLocationSearch() {
    document.getElementById('locationSearchModal').style.display = 'flex';
    document.getElementById('locationSearchInput').focus();
    document.getElementById('searchResults').innerHTML = '';
}

function closeLocationSearch() {
    document.getElementById('locationSearchModal').style.display = 'none';
    document.getElementById('locationSearchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

function searchIndianCities(query) {
    const resultsContainer = document.getElementById('searchResults');
    const q = (query || '').trim();
    if (!q) {
        resultsContainer.innerHTML = '';
        currentResults = [];
        selectedResultIndex = -1;
        return;
    }

    const searchTerm = q.toLowerCase();
    // return top 8 matches for smooth UI
    const results = indianCities.filter(city =>
        city.name.toLowerCase().includes(searchTerm) ||
        city.state.toLowerCase().includes(searchTerm)
    ).slice(0, 8);

    currentResults = results;
    selectedResultIndex = -1;

    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="no-results">No cities found. Try another search.</div>';
        return;
    }

    // simple safe highlight of matched substring
    const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${safeQ})`, 'ig');

    resultsContainer.innerHTML = results.map((city, idx) => {
        const nameHtml = escapeHtml(city.name).replace(regex, '<mark>$1</mark>');
        const stateHtml = escapeHtml(city.state).replace(regex, '<mark>$1</mark>');
        return `
        <div tabindex="0" data-idx="${idx}" class="search-result-item" onclick="selectCity(${city.lat}, ${city.lon}, '${city.name}', '${city.state}')">
            <strong>${nameHtml}</strong>
            <small>${stateHtml}</small>
        </div>`;
    }).join('');
}

function selectCity(lat, lon, cityName, state) {
    closeLocationSearch();
    fetchWeatherData(lat, lon, `${cityName}, ${state}`);
}

// ============ GEOLOCATION & WEATHER ============

function requestLocationAndFetchWeather() {
    const defaultCity = indianCities[1]; // Delhi
    let resolved = false;

    // Fast fallback: if geolocation takes longer than 2.5 seconds or is waiting for permission prompt, load default city first
    const fallbackTimer = setTimeout(() => {
        if (!resolved) {
            console.log('Geolocation pending or delayed, loading default location...');
            fetchWeatherData(defaultCity.lat, defaultCity.lon, `${defaultCity.name}, ${defaultCity.state}`);
        }
    }, 2500);

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolved = true;
                clearTimeout(fallbackTimer);
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log('Location allowed:', latitude, longitude);
                fetchWeatherData(latitude, longitude);
            },
            (error) => {
                resolved = true;
                clearTimeout(fallbackTimer);
                console.log('Location denied or unavailable:', error.message);
                fetchWeatherData(defaultCity.lat, defaultCity.lon, `${defaultCity.name}, ${defaultCity.state}`);
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 60000
            }
        );
    } else {
        clearTimeout(fallbackTimer);
        fetchWeatherData(defaultCity.lat, defaultCity.lon, `${defaultCity.name}, ${defaultCity.state}`);
    }
}

function fetchWeatherData(lat, lon, knownLocationName = null) {
    // Open-Meteo API (100% FREE, open-source, no API key required)
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility&timezone=auto`;

    // If city name is already known, fetch weather immediately
    if (knownLocationName) {
        fetch(weatherUrl)
            .then(res => {
                if (!res.ok) throw new Error('Weather service responded with status ' + res.status);
                return res.json();
            })
            .then(weatherData => {
                displayWeather(weatherData, knownLocationName, lat, lon);
            })
            .catch(error => {
                console.error('Weather API error:', error);
                showWeatherError('Failed to fetch weather data. Please try again.');
            });
        return;
    }

    // Free client-side reverse geocoding (no API key required, reliable)
    const reverseGeoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

    Promise.allSettled([
        fetch(weatherUrl).then(res => res.json()),
        fetch(reverseGeoUrl).then(res => res.json())
    ])
    .then(([weatherResult, geoResult]) => {
        if (weatherResult.status !== 'fulfilled' || !weatherResult.value?.current) {
            throw new Error('Weather data unavailable.');
        }
        const weatherData = weatherResult.value;
        const geoData = geoResult.status === 'fulfilled' ? geoResult.value : null;
        const detectedName = geoData?.city || geoData?.locality || geoData?.principalSubdivision || 'Your Location';
        displayWeather(weatherData, detectedName, lat, lon);
    })
    .catch((error) => {
        console.error('Weather API error:', error);
        showWeatherError('Failed to fetch weather data. Please try again.');
    });
}

function getWeatherDescription(code) {
    // WMO Weather interpretation codes
    const weatherCodes = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Depositing rime fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Slight rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Slight snow',
        73: 'Moderate snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Slight rain showers',
        81: 'Moderate rain showers',
        82: 'Violent rain showers',
        85: 'Slight snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with slight hail',
        99: 'Thunderstorm with heavy hail'
    };
    return weatherCodes[code] || 'Unknown';
}

function displayWeather(weatherData, locationName, lat, lon) {
    const current = weatherData.current;
    if (!current) {
        showWeatherError('Unable to parse weather data.');
        return;
    }

    // Update UI
    document.getElementById('locationName').textContent = locationName || 'Your Location';
    document.getElementById('coordinates').textContent = `${lat.toFixed(4)}°, ${lon.toFixed(4)}°`;
    document.getElementById('temp').textContent = Math.round(current.temperature_2m);
    document.getElementById('feelsLike').textContent = `Feels like: ${Math.round(current.apparent_temperature)}°C`;
    document.getElementById('description').textContent = getWeatherDescription(current.weather_code);
    document.getElementById('humidity').textContent = `${current.relative_humidity_2m}%`;
    document.getElementById('windSpeed').textContent = `${current.wind_speed_10m} km/h`;
    document.getElementById('pressure').textContent = `${current.pressure_msl} hPa`;
    document.getElementById('visibility').textContent = `${(current.visibility / 1000).toFixed(1)} km`;
    
    // Show weather content, hide loader
    document.getElementById('weatherLoader').style.display = 'none';
    document.getElementById('weatherContent').style.display = 'flex';
    document.getElementById('weatherError').style.display = 'none';
    
    // Update crop recommendation location context
    if (typeof updateCropLocationContext === 'function') {
        updateCropLocationContext(locationName, Math.round(current.temperature_2m), current.relative_humidity_2m, lat, lon);
    }
}

function showWeatherError(message) {
    document.getElementById('weatherLoader').style.display = 'none';
    document.getElementById('weatherContent').style.display = 'none';
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('weatherError').style.display = 'block';
}

// ============ EVENT LISTENERS ============

// Add event listener for search input
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('locationSearchInput');
    if (searchInput) {
        // debounce helper
        function debounce(fn, wait) {
            let t = null;
            return function (...args) {
                clearTimeout(t);
                t = setTimeout(() => fn.apply(this, args), wait);
            };
        }

        const debouncedSearch = debounce((val) => searchIndianCities(val), 260);
        searchInput.addEventListener('input', (e) => {
            debouncedSearch(e.target.value);
        });

        // keyboard navigation for results
        searchInput.addEventListener('keydown', (e) => {
            const resultsEl = document.getElementById('searchResults');
            const items = resultsEl ? resultsEl.querySelectorAll('.search-result-item') : [];
            if (!items || items.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedResultIndex = Math.min(selectedResultIndex + 1, items.length - 1);
                updateSelection(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedResultIndex = Math.max(selectedResultIndex - 1, 0);
                updateSelection(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedResultIndex >= 0 && currentResults[selectedResultIndex]) {
                    const c = currentResults[selectedResultIndex];
                    selectCity(c.lat, c.lon, c.name, c.state);
                } else if (items.length === 1) {
                    items[0].click();
                }
            }
        });

        // support Enter on focused result items
        document.getElementById('searchResults').addEventListener('keydown', (e) => {
            const target = e.target;
            if (!target.classList || !target.classList.contains('search-result-item')) return;
            if (e.key === 'Enter') target.click();
        });
    }
});

// selection state + helpers
let selectedResultIndex = -1;
let currentResults = [];

function updateSelection(items) {
    items.forEach((it, i) => {
        if (i === selectedResultIndex) {
            it.classList.add('selected');
            it.focus();
        } else {
            it.classList.remove('selected');
        }
    });
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    const modal = document.getElementById('locationSearchModal');
    if (e.target === modal) {
        closeLocationSearch();
    }
});

// ============ INITIALIZE ============

// Check if user is already logged in
window.addEventListener('load', function () {
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
        currentUser = loggedInUser;
        document.getElementById('userDisplay').textContent = currentUser;
        togglePages('dashboard');
        
        // Request location and fetch weather after a brief delay
        setTimeout(() => {
            requestLocationAndFetchWeather();
        }, 500);
    } else {
        togglePages('signup');
    }
});

