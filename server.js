const http = require('http');
const fs = require('fs');
const path = require('path');

try { process.loadEnvFile(path.join(__dirname, '.env')); } catch { /* .env is optional; env vars may already be set */ }

const port = process.env.PORT || 3000;
const apiKey = process.env.GEMINI_API_KEY;
const publicFiles = { '/': 'index.html', '/index.html': 'index.html', '/styles.css': 'styles.css', '/app.js': 'app.js', '/crop-recommendation.js': 'crop-recommendation.js' };
function send(res, status, body, type = 'application/json') { res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' }); res.end(type === 'application/json' ? JSON.stringify(body) : body); }
function buildPrompt(cropName, location) {
    const place = location.city || 'the selected location';
    const conditions = location.temperature == null ? 'Live weather is not yet available.' : `Temperature: ${location.temperature}°C; humidity: ${location.humidity}%; coordinates: ${location.latitude}, ${location.longitude}.`;
    return `You are an agricultural advisor. Give a concise, practical growing recommendation for ${cropName} in ${place}. Current conditions: ${conditions}\nUse these bold section headings: Suitability, Ideal conditions, Planting & care, Soil & water, Local challenges, Three practical tips. State uncertainties clearly; do not invent weather data.`;
}
http.createServer(async (req, res) => {
    if (req.method === 'GET' && publicFiles[req.url]) {
        const file = path.join(__dirname, publicFiles[req.url]); const contentType = file.endsWith('.css') ? 'text/css' : file.endsWith('.js') ? 'text/javascript' : 'text/html';
        return fs.readFile(file, (error, data) => error ? send(res, 500, { error: 'Unable to load application file.' }) : send(res, 200, data, contentType));
    }
    if (req.method !== 'POST' || req.url !== '/api/recommendations') return send(res, 404, { error: 'Not found.' });
    if (!apiKey) return send(res, 503, { error: 'GEMINI_API_KEY is not configured. Set it in your terminal before starting the server.' });
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; if (raw.length > 20000) req.destroy(); });
    req.on('end', async () => {
        try {
            const { cropName, location = {} } = JSON.parse(raw);
            if (typeof cropName !== 'string' || !cropName.trim() || cropName.length > 80) return send(res, 400, { error: 'Please provide a valid crop name.' });
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: buildPrompt(cropName.trim(), location) }] }], generationConfig: { temperature: 0.35, maxOutputTokens: 2048, thinkingConfig: { thinkingLevel: 'low' } } }) });
            const data = await response.json();
            if (!response.ok) return send(res, response.status, { error: data.error?.message || 'Gemini request failed.' });
            const blockReason = data.promptFeedback?.blockReason || (data.candidates?.[0]?.finishReason === 'SAFETY' ? 'SAFETY' : null);
            if (blockReason) return send(res, 502, { error: `Gemini declined to answer (${blockReason}). Try rephrasing the crop name.` });
            const recommendation = data.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
            if (!recommendation) return send(res, 502, { error: 'Gemini returned no recommendation. Please try again.' });
            send(res, 200, { recommendation });
        } catch (error) {
            console.error('Recommendation request failed:', error);
            send(res, 500, { error: 'Recommendation service failed. Please try again.' });
        }
    });
}).listen(port, () => console.log(`Crop advisor running at http://localhost:${port}`));
