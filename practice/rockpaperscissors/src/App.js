import {useState} from "react";
import './App.css';
import Box from './component/Box';

/*1. 박스 요소 - 이름, 이미지, 결과
  2. 가위,바위,보 버튼이 있음
  3. 버튼을 클릭하면★ -> onclick
     내가 고른 이미지가 출력★되어야함 -> 매개변수 전달
  4. 컴퓨터도 내가 버튼 누를 때 이미지가 바뀌어야함(랜덤하게)
  5. 게임의 결과가 아래 문구로 출력되어야함
  6. 이긴사람, 진사람 구분할 수 있는 스타일 요소가 필요
*/

const choice = {// 1.const로 선언이유: 값의 불변성 보장 
                // 2. choice는 객체, choice 안의 요소들은 choice객체의 속성들이며
                //    속성은 값 자체가 될 수도 있고, 또다른 하나의 객체 역할을 할 수도 있음!
  rock:{
    name: "Rock",
    img: "https://m.bigfile.co.kr/_template/service/images//07event_images/2016/04_gamezone/gamezone_rps_motion_r.png"
  },
  scissors:{
    name: "Scissors",
    img: "https://m.bigfile.co.kr/_template/service/images//07event_images/2016/04_gamezone/gamezone_rps_motion_s.png"
  },
  paper:{
    name: "Paper",
    img: "https://m.bigfile.co.kr/_template/service/images//07event_images/2016/04_gamezone/gamezone_rps_motion_p.png"
  }
}


function App() {

  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");

  const play = (userChoice) => {//버튼을 클릭했을 때 실행될 play함수를 선언해 준 것! 
    console.log("선택됨!",userChoice);
    setUserSelect(choice[userChoice]);  {/*state는 set함수를 써서 값을 변경해줘야함 */}
    /*유저가 아이템을 선택할 때, 컴터는 랜덤값 선택 */
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice],computerChoice));
  }

  const judgement = (user, computer) => {
    if(user.name === computer.name){
      return "tie";
    }else if(user.name === "Rock") return computer.name === "Scissors" ? "win":"lose";  
    else if(user.name === "Scissors") return computer.name === "Paper" ? "win":"lose";
    else if(user.name === "Paper") return computer.name === "Rock" ? "win":"lose";
  }

  const randomChoice=()=>{
    let itemArray = Object.keys(choice); //객체의 키값이 배열화됨.
    let randomItem = Math.floor(Math.random()*itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  }

  const computerResult = (result) => {
    if(result === "win") return "lose";
    if(result === "lose") return "win";
    return result;
  }

  return (
    <div>
      <div className="main"> 
        <Box title="나" item={userSelect} result={result}/>
        <Box title="친구" item={computerSelect} result={computerResult(result)}/>
      </div>
      <div className="btn">
        <button onClick={() => play("scissors")}>가위</button> {/* 리액트가 실행될 때 함수를 바로 실행시켜버려서 바로 콘솔에 떠버림. 콜백함수로 바꿔버려야함 */}
        <button onClick={() => play("rock")}>바위</button>     {/* ★정리: onClick함수 사용할 때에는 함수를 콜백함수 형태로 넣어야한다!!! */}
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
  );
}

export default App;
