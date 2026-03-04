const axios = require("axios");
const { getWeather } = require("../tools/weatherTool");

async function processQuery(query) {
  console.log("query", query);

  const response = await axios.post("http://localhost:11434/api/generate", {
    model: "qwen3-coder:480b-cloud",
    prompt: `
Extract the city and intent from this query.
Return JSON.

Query: ${query}

Example output:
{
 "intent": "get_weather",
 "city": "Seattle"
}
`,
    stream: false,
  });

  const text = response.data.response;

  console.log("RAW LLM RESPONSE:");
  console.log(text);

  const parsed = JSON.parse(text);

  console.log("parsed", parsed);

  if (parsed.intent === "get_weather") {
    const weather = await getWeather(parsed.city);

    return `
Weather in ${parsed.city}

Temperature: ${weather.temperature}
Wind: ${weather.wind}
Forecast: ${weather.forecast}
`;
  }

  return "Unable to process request.";
}

module.exports = { processQuery };
