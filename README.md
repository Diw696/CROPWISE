## CropWise
#FILE REVIEWED NEEDS TRANING AND TEST DATA CURRENLTY JUST USING THE API BUT HAD TO MAKE IT BETTER AS WE TRAIN OUR MODEL IN FUTURE
CropWise combines local weather with a Gemini-powered crop and flower growing guide.

## Run locally

A `.env` file with `GEMINI_API_KEY` is already set up in this project (Node loads it automatically — no extra package needed). Just run:

```powershell
node server.js
```

Or `npm start`. Open [http://localhost:3000](http://localhost:3000). The API key stays on the local server and is never sent to the browser.

## Login

Sign-up/sign-in is stored in the browser's `localStorage` (no real backend/database — fine for a demo, not for production). A default account is seeded on first load:

- Username: `admin`
- Password: `admin987`

You can also sign up with any other username/password (6+ characters) from the Sign Up page.

## Notes

- The server uses `gemini-3.6-flash`, the model currently recommended for this API key's account. If Google retires it again, check `GET https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY` for the current model list.
- Gemini 3.x models do internal "thinking" that consumes output tokens; `generationConfig` sets `thinkingLevel: 'low'` and a larger `maxOutputTokens` so responses aren't cut off.
- Weather is sourced from Open-Meteo; selecting a city (or allowing geolocation) lets the crop advisor use current conditions. If geolocation is denied, use the "Search location instead" button that now appears in the error state.
- Passwords are stored in plain text in `localStorage` for this demo — do not reuse a real password here.
