'use strict';
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const superagent = require('superagent')

const PORT = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

app.use(cors());

app.get('/weather', handleWeather);
app.get('/movies', handleMovies)

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

function handleMovies(request, response) {
  const userQuery = request.query.city;
  const url = `https://api.themoviedb.org/3/search/movie?query=${userQuery}&api_key=${MOVIE_API_KEY}`

  superagent.get(url)
    .then(results => {
      let data = results.body.results;
      let movieList = data.map(movie => {
        return new Movie(movie)
      })
      response.status(200).send(movieList)
    })
    .catch(err => {
      console.log(err)
      response.status(500).send(err.message)
    })
}

function Movie(obj) {
  this.title = obj.title;
  this.overview = obj.overview;
  this.average_votes = obj.vote_average;
  this.total_votes = obj.vote_count;
  this.image_url = obj.poster_path ? `https://image.tmdb.org/t/p/w500/${obj.poster_path}` : 'https://www.stevensegallery.com/640/360';
  this.popularity = obj.popularity;
  this.released_on = obj.release_date;
};

app.use('*', (request, response) => response.status(404).send('Route Not Found'))


app.listen(PORT, () => {
  console.log(`301 is rockin on ${PORT}!`)
})