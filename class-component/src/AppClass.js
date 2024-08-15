import React, { Component } from "react";
import "./App.css";
import BoxClass from "./component/BoxClass";

const CHOICE_IMG = {
  rock: {
    name: "Rock",
    img: "https://m.bigfile.co.kr/_template/service/images//07event_images/2016/04_gamezone/gamezone_rps_motion_r.png",
  },
  scissors: {
    name: "Scissors",
    img: "https://m.bigfile.co.kr/_template/service/images//07event_images/2016/04_gamezone/gamezone_rps_motion_s.png",
  },
  paper: {
    name: "Paper",
    img: "https://m.bigfile.co.kr/_template/service/images//07event_images/2016/04_gamezone/gamezone_rps_motion_p.png",
  },
};

export default class AppClass extends Component {
  constructor() {
    super();
    this.state = {
      userSelect: null,
      computerSelect: null,
      result: "",
    };
    
  }

  play = (userChoice) => {
    //userChoice라는 변수가 가위,바위,보 중 하나 담음.
    let computerChoice = this.randomChoice();

    this.setState({
      userSelect: CHOICE_IMG[userChoice], 
      computerSelect: computerChoice, //컴퓨터 값 저장
      result: this.judgement(CHOICE_IMG[userChoice], computerChoice), // 누가 이겼는지 판단.
      
    });
  };
  randomChoice = () => {
    let itemArray = Object.keys(CHOICE_IMG); //객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return CHOICE_IMG[final];
  };
  judgement = (user, computer) => {

    if (user.name == computer.name) {
      return "tie";
    } else if (user.name == "Rock")
      return computer.name == "Scissors" ? "win" : "lose";
    else if (user.name == "Scissors")
      return computer.name == "Paper" ? "win" : "lose";
    else if (user.name == "Paper")
      return computer.name == "Rock" ? "win" : "lose";
  };

  computerResult = (result) => {
    if(result === "win") return "lose";
    if(result === "lose") return "win";
    return result;
  }

  render() {
    return (
      <div>
        <div className="main">
          <BoxClass
            title="You"
            item={this.state.userSelect}
            result={this.state.result}
          />
          <BoxClass
            title="Computer"
            item={this.state.computerSelect}
            result={this.state.result}
          />
        </div>
        <div className="main">
          <button onClick={() => this.play("scissors")}>가위</button>
          <button onClick={() => this.play("rock")}>바위</button>
          <button onClick={() => this.play("paper")}>보</button>
        </div>
      </div>
    );
  }
}