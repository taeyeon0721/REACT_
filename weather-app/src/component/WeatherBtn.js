import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherBtn = ({cities,setCity,city}) => {
  
  return (//리액트 전용 부트스트랩 사용해야함.
    <div className='wBtn'> 
      <Button className={city==''? 'active':''} variant="warning" onClick={()=>setCity('')}>Current Location</Button>
      {cities.map((item, index) =>(
        <Button className={city==item? 'active':''} variant="warning" key={index} onClick={()=>setCity(item)}>{item}</Button>
      ))}
      {/* city의 수가 많을 때를 가정하여, 배열로 받아와서 값 보여주는 방식을 사용함.
          <Button variant="warning">New York</Button>{' '}
          <Button variant="warning">Paris</Button>{' '} */}
    </div>
  )
}

export default WeatherBtn
