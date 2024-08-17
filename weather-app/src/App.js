import {useState,useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from "./component/WeatherBox";
import WeatherBtn from "./component/WeatherBtn";

//1. 앱이 실행되자마자 현재위치기반의 날씨가 보임.
//2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨상태
//3. 5개의 버튼 있음(1개는 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할때마다 도시별 날씨가 나옴.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나옴
//6. 데이터를 들고오는 동안 로딩 스피너가 돔
function App() {

  const [weather, setWeather] = useState(null);
  

  const getCurrentLocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{//API문서에는 showPosition이라는 함수를 매개변수로 받는데, 
      let lat = position.coords.latitude;                 //그러면 showPosition함수 또 선언해줘야하니까 바로 함수 때려넣어줌!
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    }); 
  }
  const apiKey = 'e99bd2d2029bc02337b761e1b6ed89df';
  const getWeatherByCurrentLocation=async(lat, lon)=>{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      let response = await fetch(url); //★await 사용하고 싶으면 async(비동기)함수여야함
      let data = await response.json(); //★api들은 대부분 json이라 json파일을 추출해야 데이터 볼수있음. 
      setWeather(data);
      
  }
  useEffect(()=>{ //useEffect: 파라미터 2개 필요 => 함수, 배열
    getCurrentLocation();
  },[])
  return (
    <div>
      <div className="main">
      <WeatherBox weather={weather}/>
      <WeatherBtn />
      </div>
    </div>
  );
}

export default App;
