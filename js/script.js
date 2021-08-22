const endPoint = "https://community-open-weather-map.p.rapidapi.com/forecast";
const option = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "YOUR_API_KEY",
    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
  },
};

const table = document.querySelector("#app tbody");
const tdList = table.querySelectorAll("td");
const tableHead = document.querySelector("#app thead tr th");
const tableWeek = document.querySelector("#week tbody");
const message = document.getElementById("message");

const requestWetherApi = async (city) => {
  message.innerHTML = "";
  const query = {
    city: city,
    mode: null, //NULL(json) or XML or HTML
    lang: "ja",
    count: 50,
  };
  const url = `${endPoint}?q=${query.city}&mode=${query.mode}&lang=${query.lang}&cnt=${query.count}`;

  const response = await fetch(url, option);
  if (!response.ok) {
    message.innerHTML = "<span class='err-message'>情報を取得できませんでした。入力内容を確認してください。</span>";
    return;
  }
  const json = await response.json();
  const weather = json.list[0];

  //today
  const todayDt = new Date(weather.dt * 1000);
  tdList[0].innerHTML = `${todayDt.toLocaleDateString("ja-jp")}  ${todayDt.toLocaleTimeString('ja-JP').slice(0, -3)}`;
  tdList[1].innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">`;
  tdList[2].innerHTML = weather.weather[0].description;
  const absoluteZero = -273.15;
  tdList[3].innerHTML = `${Math.round((weather.main.temp + absoluteZero) * 10) / 10}℃`;
  tdList[4].innerHTML = `${Math.round((weather.main.temp_min + absoluteZero) * 10) / 10}℃`;
  tdList[5].innerHTML = `${Math.round((weather.main.temp_max + absoluteZero) * 10) / 10}℃`;
  tdList[6].innerHTML = `${weather.main.humidity}%`;
  tdList[7].innerHTML = `${weather.main.pressure}hPa`;
  tdList[8].innerHTML = new Date(json.city.sunrise * 1000).toLocaleTimeString("ja-JP");
  tdList[9].innerHTML = new Date(json.city.sunset * 1000).toLocaleTimeString("ja-JP");

  tableHead.innerHTML = `${json.city.name}の天気`;

  //week
  const weatherList = json.list;
  let result = "";
  for (const weather of weatherList) {
    const dt = new Date(weather.dt * 1000);
    const date = `<td>${dt.toLocaleDateString("ja-JP").slice(5)}  <br class="sp-br">${dt.toLocaleTimeString('ja-JP').slice(0, -3)}</td>`;
    const img = `<td><img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png"></td>`;
    const description = `<td>${weather.weather[0].description}</td>`;
    const maxTemp = `<td>${Math.round((weather.main.temp_min + absoluteZero) * 10) / 10}℃</td>`;
    const minTemp = `<td>${Math.round((weather.main.temp_max + absoluteZero) * 10) / 10}℃</td>`;
    result += `<tr>${date}${img}${description}${maxTemp}${minTemp}</tr>`;
  }
  tableWeek.innerHTML = result;
};

const updateAnimation = () => {
  const trList = document.querySelectorAll("#app tbody tr");
  for (const tr of trList) {
    tr.classList.add("hidden");
    tr.classList.remove("show");
  }
  
  let time = 0;
  const timeSpan = 50;
  const show = elm => setTimeout(() => elm.classList.add("show"), time);

  for (const tr of trList) {
    show(tr);
    time += timeSpan;
  }
}

requestWetherApi("tokyo");

document.getElementById("serch-btn").addEventListener("click", () => {
  const serchWord = document.getElementById("serch-form").value;
  requestWetherApi(serchWord);
  updateAnimation();
});

document.getElementById("to-top").addEventListener("click", (e) => {
  e.preventDefault();
  const target = document.getElementById("serch-form");
 
  // 画面上部から要素までの距離
  const rectTop = target.getBoundingClientRect().top
  // 現在のスクロール距離
  const offsetTop = window.pageYOffset
  // スクロール位置に持たせるバッファ
  const buffer = target.offsetHeight;
  const top = rectTop + offsetTop - buffer;
  
  window.scrollTo({
    top,
    behavior: "smooth"
  });
});

//https://openweathermap.org/weather-data#5days
