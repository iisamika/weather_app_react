import React from 'react';
import ReactDOM from 'react-dom';
import Forecast from './forecast';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      temp: '',
      cityName: '',
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    const temp = (weather.main.temp).toFixed(1);
    const icon = weather.weather[0].icon.slice(0, -1);
    this.setState({ temp, icon, cityName: weather.name });
  }

  render() {
    const { icon, temp, cityName } = this.state;
    return (
      <div className="root">
        <div className="weather">
          <div className="icon">
            { icon && <img src={`/img/${icon}.svg`} alt="testi" /> }
          </div>
          <div className="weatherInfo">
            <div className="location">
              <h2>Kaupunki: {cityName}</h2>
            </div>
            <div className="temp">
              <h2>Tämän hetkinen lämpötila: {temp} &#8451;</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <div>
    <Weather />
    <Forecast />
  </div>,
  document.getElementById('app')
);
