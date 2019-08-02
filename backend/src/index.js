// const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';
const appId = process.env.APPID || 'f3eb808c77c50def1e518421aa6315e9';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity}&units=metric&appid=${appId}&`;
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

const fetchForecast = async () => {
  const endpointForecast = `${mapURI}/forecast?q=${targetCity}&units=metric&appid=${appId}&`;
  const responseForecast = await fetch(endpointForecast);
  return responseForecast ? responseForecast.json() : {};
};

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData;
});

router.get('/api/forecast', async ctx =>  {
  const forecastData = await fetchForecast();
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = forecastData;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
