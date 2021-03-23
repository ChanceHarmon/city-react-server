'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const weatherObj = require('./data/weather.json');

const PORT = process.env.PORT;

app.use(cors());

app.get('/weather', handleWeather);

function handleWeather(request, response) {
  let forecastArray = weatherObj.data.map(day => {
    return new Weather(day)
  })
  response.status(200).send(forecastArray)
}

function Weather(obj) {
  this.description = obj.weather.description;
  this.date = obj.datetime;
}


app.listen(PORT, () => {
  console.log(`301 is rockin on ${PORT}!`)
})