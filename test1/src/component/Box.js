import React from 'react'

const Box = (props) => {  
  console.log("props",props);
  
  const getBorderColor = () => {
    if(props.result === "win") return "3px solid green";
    if(props.result === "lose") return "3px solid red";
    return "3px solid black";
  }

  return (
    <div> 
        <div className="box" style={{border:getBorderColor()}}>
            <h1>{props.title}</h1>
            <img className="item-img" src={props.item && props.item.img}/>
            {/* 초기값이 null이라면 props.item이라는 가드값을 넣어줘야함 
                props.item이라는 값이 false면 애초에 실행을 안하기 때문
                하지만, 유저가 넘겨준 item값이 있으면 true가 되면서
                item에 있는 이미지 값을 불러오게 됨
                */}
            <h2>{props.result}</h2>
        </div>        
    </div>
  )
}

export default Box
