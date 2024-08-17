import React from 'react'

const WeatherBox = ({weather}) => {//Distructuring: props안사용하고 객체의 key값만 가져올 수 있음
    console.log("weather: ",weather);

  return (
    <div className="weather-box">
      <div>{weather && weather.name}</div>  {/* 삼항연산식: weather?.name도 가능 */}
      <h2>{weather?.main.temp}C/{((weather?.main.temp * 9/5) + 32).toFixed(2)}F</h2>
      <h3>{weather?.weather[0].description}</h3>
    </div>
  )
}

export default WeatherBox
