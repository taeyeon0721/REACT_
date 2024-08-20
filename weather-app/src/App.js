import {useState,useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from "./component/WeatherBox";
import WeatherBtn from "./component/WeatherBtn";
import ClipLoader from "react-spinners/ClipLoader";

//1. 앱이 실행되자마자 현재위치기반의 날씨가 보임.
//2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨상태
//3. 5개의 버튼 있음(1개는 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할때마다 도시별 날씨가 나옴.
//5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나옴
//6. 데이터를 들고오는 동안 로딩 스피너가 돔
function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading,setLoading] = useState(false);
  const cities=['PARIS','NEW YORK', "TOKYO", "SEOUL"];

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
      setLoading(true);
      let response = await fetch(url); //★await 사용하고 싶으면 async(비동기)함수여야함
      let data = await response.json(); //★api들은 대부분 json이라 json파일을 추출해야 데이터 볼수있음. 
      setWeather(data);
      setLoading(false);
      
  }

  const getWeatherByCity=async()=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    setLoading(true);
    let response = await fetch(url); 
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  /* useEffect가 실행될 조건
    1. UI가 처음에 그려졌을때
    2. 배열에 값이 있다면, 값이 바뀔 때 마다 호출  */

  useEffect(()=>{ //useEffect: 파라미터 2개 필요 => 함수, 배열
    if(city=="") getCurrentLocation();
    else getWeatherByCity();
  },[city]);

  return (
    <div>
      {loading? ( 
        <div className="main">
          <ClipLoader color="orange" loading={loading} size={150}/> 
      </div> ) : (
        <div className="main">
          <ClipLoader color="orange" loading={loading} size={150}/>
          <WeatherBox weather={weather}/>
          <WeatherBtn cities={cities} setCity={setCity} city={city}/> 
      {/* 1. App.js가 필요한 함수 다 가지고 있음
      2. 부모에서 자식으로 함수도 보내줄 수 있음
      3. 버튼.js는 받은 함수를 이용해서 값을 바꿔줌
      4. App.js에서 상태변화 확인할 수 있음 */}
        </div>)}
    </div>
  );
}

export default App;
