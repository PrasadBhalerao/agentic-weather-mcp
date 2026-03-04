const axios = require("axios");

async function getCoordinates(city) {

    const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: city,
                format: "json",
                limit: 1
            },
            headers: {
                "User-Agent": "agentic-weather-ai"
            }
        }
    );

    const place = response.data[0];

    return {
        lat: parseFloat(place.lat),
        lon: parseFloat(place.lon)
    };
}

module.exports = { getCoordinates };