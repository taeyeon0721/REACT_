import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherBtn = () => {
  return (//리액트 전용 부트스트랩 사용해야함.
    <div> 
      <Button variant="warning">Current Location</Button>{' '}
      <Button variant="warning">New York</Button>{' '}
      <Button variant="warning">Paris</Button>{' '}
    </div>
  )
}

export default WeatherBtn
