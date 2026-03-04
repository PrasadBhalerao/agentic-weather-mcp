const axios = require("axios");
const { getCoordinates } = require("../services/geocodeService");

async function getWeather(city) {

    const coords = await getCoordinates(city);

    const headers = {
        "User-Agent": "agentic-weather-ai (demo@example.com)",
        "Accept": "application/geo+json"
    };

    // Find nearest weather stations
    const stationResp = await axios.get(
        `https://api.weather.gov/points/${coords.lat},${coords.lon}/stations`,
        { headers }
    );

    const station = stationResp.data.features[0].properties.stationIdentifier;

    // Get latest observation
    const obsResp = await axios.get(
        `https://api.weather.gov/stations/${station}/observations/latest`,
        { headers }
    );

    const obs = obsResp.data.properties;

    return {
        city,
        temperature: obs.temperature.value,
        wind: obs.windSpeed.value,
        forecast: obs.textDescription
    };
}

module.exports = { getWeather };