const router = require("express").Router();
const weatherConroller = "";
//const fetch = require("node-fetch");
// const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const axios = require("axios");
const makeToken = require("../../utils/AppleTokenGenerator");

router.route("/")
    .get(async function(req, res){
        if(req.query.lat && req.query.long){
          if (req.session.weatherData) {
            // see if the weather data date is within the last 5 minutes
            const recent =
              req.session.weatherData && req.session.weatherData.asOf;
            // see if the lat and long match
          }

          const latitude = req.query.lat;
          const longitude = req.query.long;
          const token = makeToken();
          const forecastUrl = `https://weatherkit.apple.com/api/v1/weather/en/${latitude}/${longitude}?dataSets=forecastDaily&timezone=America/New_York`;
        const currentWeatherUrl = `https://weatherkit.apple.com/api/v1/weather/en/${latitude}/${longitude}?dataSets=currentWeather&timezone=America/New_York`;
          //?dataSets=currentWeather
          //?dataSets=forecastDaily&timezone=America/Los_Angeles
          // add the token to your headers
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const { data: forecastweatherData } = await axios.get(forecastUrl, config);
          const { data: currentWeatherData } = await axios.get(currentWeatherUrl, config);
          const weatherData = {
            currentWeather: currentWeatherData.currentWeather,
            forecastDaily: forecastweatherData.forecastDaily
          }
          if (!weatherData) {
            res.status(404).send();
          } else {
            req.session.weatherData = weatherData;
            if (!req.query.report) {
              res.json(weatherData);
            } else {
              const weatherDataString = JSON.stringify(weatherData);
              console.log(weatherDataString);
              const completionUrl =
                "https://api.openai.com/v1/chat/completions";
              const completionConfig = {
                headers: {
                  Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`,
                },
              };
              const completionRequestData = {
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "user",
                    content: `Summarize the following data into a brief wether report, convert units from metric to US standard, and do not include anything about being an AI language model. ${weatherDataString}`,
                  },
                ],
              };
              const response = await axios.post(
                completionUrl,
                completionRequestData,
                completionConfig
              );
              if (
                response.data &&
                response.data.choices &&
                response.data.choices.length > 0
              ) {
                const choices = response.data.choices;
                console.log("choices");
                console.log(choices);
                const messages = choices.map((choice) => {
                  return choice.message.content;
                });
                const message = messages.join(" ");
                weatherData.summary = message;
                res.json(weatherData);
              } else {
                res.json(weatherData);
              }
            }
          }
        } else {
            res.status(400).send();
        }
    })

module.exports = router;