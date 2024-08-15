import React from 'react'

const Box = (props) => { //props는 app.js에서 아무키나 만들어도, props객체로 받아서 객체의 키값으로 사용할 수 있음. 개신기
   
  console.log("props",props);
  return (
    <div>
        <div className={`box ${props.result}`}>
            <h1>{props.title}</h1>
            <img className="item-img" src={props.item && props.item.img}/>
            <h2>{props.result}</h2>
        </div>
    </div>
  )
}

export default Box
