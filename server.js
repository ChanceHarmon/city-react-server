'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const superagent = require('superagent')

const PORT = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.use(cors());

app.get('/weather', handleWeather);

function handleWeather(request, response) {
  const { lat, lon } = request.query;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}&days=8`;

  superagent.get(url)
    .then(results => {
      let forecastArray = results.body.data.map(day => {
        return new Weather(day)
      })
      console.log(forecastArray)
      response.status(200).send(forecastArray)
    })
    .catch(err => {
      console.log(err)
      response.status(500).send(err.message)
    })

}

function Weather(obj) {
  this.description = obj.weather.description;
  this.date = obj.datetime;
}



app.use('*', (request, response) => response.status(404).send('Route Not Found'))


app.listen(PORT, () => {
  console.log(`301 is rockin on ${PORT}!`)
})