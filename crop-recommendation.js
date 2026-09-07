let currentLocationData = {
    city: 'your selected location', temperature: null, humidity: null, latitude: null, longitude: null
};

async function searchCropRecommendation() {
    const input = document.getElementById('cropSearchInput');
    const cropName = input.value.trim();
    if (!cropName) { showCropError('Enter a crop or flower name to receive a recommendation.'); input.focus(); return; }

    hideCropResult();
    document.getElementById('cropRecommendationLoader').style.display = 'block';
    document.getElementById('cropError').style.display = 'none';
    try {
        const response = await fetch('/api/recommendations', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cropName, location: currentLocationData })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to generate a recommendation.');
        displayCropRecommendation(cropName, data.recommendation);
    } catch (error) {
        showCropError(error.message.includes('Failed to fetch') ? 'Start the app with “node server.js”, then try again.' : error.message);
    } finally { document.getElementById('cropRecommendationLoader').style.display = 'none'; }
}

function escapeHtml(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function formatRecommendation(text) {
    return escapeHtml(text).split('\n').map((line) => {
        const clean = line.trim();
        if (!clean) return '';
        const heading = clean.match(/^\*\*(.+?)\*\*:?[\s]*(.*)$/);
        if (heading) return `<h4>${heading[1]}</h4>${heading[2] ? `<p>${heading[2]}</p>` : ''}`;
        if (/^[-*]\s+/.test(clean)) return `<li>${clean.replace(/^[-*]\s+/, '')}</li>`;
        return `<p>${clean.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')}</p>`;
    }).join('').replace(/(<li>.*?<\/li>)+/g, (items) => `<ul>${items}</ul>`);
}

function displayCropRecommendation(cropName, recommendation) {
    document.getElementById('cropName').textContent = `${cropName} growing guide`;
    document.getElementById('recommendationContent').innerHTML = formatRecommendation(recommendation);
    document.getElementById('cropRecommendationResult').style.display = 'block';
    document.getElementById('cropError').style.display = 'none';
}

function showCropError(message) {
    document.getElementById('cropRecommendationLoader').style.display = 'none';
    document.getElementById('cropRecommendationResult').style.display = 'none';
    document.getElementById('cropErrorMessage').textContent = message;
    document.getElementById('cropError').style.display = 'block';
}
function hideCropResult() { document.getElementById('cropRecommendationResult').style.display = 'none'; }
function updateCropLocationContext(locationName, temp, humidity, lat, lon) {
    currentLocationData = { city: locationName, temperature: temp, humidity, latitude: lat, longitude: lon };
    const label = document.getElementById('recommendationLocation');
    if (label) label.textContent = `Using live conditions in ${locationName}`;
}
document.addEventListener('DOMContentLoaded', () => document.getElementById('cropSearchInput')?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') searchCropRecommendation();
}));
