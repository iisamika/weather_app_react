import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/forecast`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

export default class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      icon2: '',
      dateTime: '',
      forecastTemp: '',
      forecastTemp2: '',
      cityName: '',
    };
  }

  async componentWillMount() {
    const forecast = await getForecastFromApi();
    const forecastTemp = (forecast.list[0].main.temp).toFixed(1);
    const forecastTemp2 = (forecast.list[1].main.temp.toFixed(1));
    const dateTime = new Date(forecast.list[0].dt*1000);
    const dateTime2 = new Date(forecast.list[1].dt*1000);
    const year = dateTime.getFullYear();
    const year2 = dateTime2.getFullYear();
    const months_arr = ['Tam', 'Hel', 'Maa', 'Huh', 'Tou', 'Kes', 'Hei', 'Elo', 'Syy', 'Lok', 'Mar', 'Jou']
    const month = months_arr[dateTime.getMonth()];
    const month2 = months_arr[dateTime2.getMonth()];
    const date = dateTime.getDate();
    const date2 = dateTime2.getDate();
    const hour = dateTime.getHours();
    const hour2 = dateTime2.getHours();
    const min = dateTime.getMinutes();
    const min2 = dateTime2.getMinutes();
    const sec = dateTime.getSeconds();
    const sec2 = dateTime2.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':0' + min + ':0' + sec ;
    const time2 = date2 + ' ' + month2 + ' ' + year2 + ' ' + hour2 + ':0' + min2 + ':0' + sec2 ;
    const icon = forecast.list[0].weather[0].icon.slice(0, -1);
    const icon2 = forecast.list[1].weather[0].icon.slice(0, -1);
    this.setState({ forecastTemp, forecastTemp2, icon, icon2, time, time2, forecastCityName: forecast.city.name });
  }

  render() {
    const { icon, icon2, time, time2, forecastTemp, forecastTemp2, forecastCityName } = this.state;
    return (
      <div className="forecast">
        <div className="forecast3Hours">
          <div className="icon">
                { icon && <img src={`/img/${icon}.svg`} alt="testi2" /> }
          </div>
          <div className="forecastLocation">
              <h2>Kaupunki: {forecastCityName}</h2>
          </div>
          <div className="forecastTime">
            <h2>Päivämäärä ja aika: {time}</h2>
          </div>
          <div className="forecastTemp">
              <h2>Lämpötila ennuste: {forecastTemp} &#8451;</h2>
          </div>
        </div>
        <div className="forecast6Hours">
          <div className="icon">
              { icon && <img src={`/img/${icon2}.svg`} alt="testi2" /> }
          </div>
          <div className="forecastLocation">
              <h2>Kaupunki: {forecastCityName}</h2>
          </div>
          <div className="forecastTime">
            <h2>Päivämäärä ja aika: {time2}</h2>
          </div>
          <div className="forecastTemp2">
              <h2>Lämpötila ennuste: {forecastTemp2} &#8451;</h2>
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <div>
    <Forecast />
  </div>,
  document.getElementById('app')
);
