import './App.css';
import Box from "./component/Box";
import {useState} from "react";
//1. 박스 2개 (타이틀, 사진, 결과값)
//2. 가위 바위 보 버튼이 있다.
//3. 버튼을 클릭하면 클릭한 값이 박스에 보임
//4. 컴퓨터는 랜덤하게 아이템 선택이 된다.
//5. 3,4번의 결과를 가지고 누가 이겼는지 승패를 따진다.
//6. 승패 결과에 따라 테두리 색이 바뀐다. (이기면-초록, 지면-빨강, 비기면-검은색)


//우리가 사용할 이미지를 저장한 객체 생성
const choice = {
  rock: {
    name: "Rock",
    img: "https://scienceresourcebox.co.nz/cdn/shop/files/Chalkrounded_WEB_1200x1200.jpg?v=1684441843"
  },
  scissors: {
    name: "Scissors",
    img: "https://www.shutterstock.com/image-vector/3d-realistic-open-scissors-black-260nw-2376677033.jpg"
  },
  paper: {
    name: "Paper",
    img: "https://www.collinsdictionary.com/images/full/paper_111691001.jpg"

  }
}


/* state에 있는 값이 변할 때 마다 UI 변함 */
function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");
  const play=(userChoice)=>{
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    //console.log(computerChoice);
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
  };

  const judgement = (user, computer) => {
    console.log("user", user, "computer", computer);

    if(user.name === computer.name){
      return "tie";
    }else if(user.name === "Rock") return computer.name === "Scissors" ? "win":"lose";  
    else if(user.name === "Scissors") return computer.name === "Paper" ? "win":"lose";
    else if(user.name === "Paper") return computer.name === "Rock" ? "win":"lose";
  };

  //객체에서 랜덤한 값을 추출하는 법  
  const randomChoice=()=>{
     let itemArray = Object.keys(choice); //객체에 키값만 뽑아서 어레이로 만들어주는 함수 
     console.log("item array", itemArray);
     let randomItem = Math.floor(Math.random()*itemArray.length); //random() => 0~1 사이의 랜덤한 숫자를 반환함
    // ★★ Math.random() * itemArray.length의 결과는 0 이상 itemArray.length - 1 이하의 정수가 됨. 다시 말해, 0, 1, 2 같은 정수 값이 나올 수 있음.  
    // ★★이 값은 배열의 유효한 인덱스가 되어 배열의 요소를 안전하게 참조할 수 있음.
     let final = itemArray[randomItem]; //이렇게 하면 itemArray의 인덱스 번호에 담겨있는 name값이 출력됨
     console.log("final",final);
     return choice[final];
  }
  
  const getComputerResult  = (result) => {
    if(result === "win") return "lose";
    if(result === "lose") return "win";
    return result;
  }


/* 1. onclick 이벤트 사용할 때, 
      함수를 바로 넣지 말고(play(X)), 콜백 함수 형태로 만들어줘야함(()=> play(O))  */
/* 2. 전체를 div로 묶어주기 -> JSX 컴포넌트는 반드시 하나의 덩어리를 리턴해야함 */
  return (
    <div>
      <div className="main">
        <Box title="You" item={userSelect} result={result}/>
        <Box title="Computer" item={computerSelect} result={getComputerResult(result)}/>
      </div>
      <div className="btn">
        <button onClick={()=>play("scissors")}>가위</button> 
        <button onClick={()=>play("rock")}>바위</button>
        <button onClick={()=>play("paper")}>보</button>
      </div>
  </div>  
  );
}

export default App;
