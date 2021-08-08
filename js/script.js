const requestWetherApi = async (city) => {
  const query = {
    city: city,
    mode: null, //NULL(json) or XML or HTML
    lang: "ja",
    count: 50,
  };
  const url = `https://community-open-weather-map.p.rapidapi.com/forecast?q=${query.city}&mode=${query.mode}&lang=${query.lang}&cnt=${query.count}`;
  const option = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0eca25fc5bmshbf6bdb1574c6aeep1e9778jsn5bfd6a2c8b28",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    },
  };
  const response = await fetch(url, option);
  const json = await response.json();
  const weather = json.list[0];

  const table = document.querySelector("#app tbody");
  const tdList = table.querySelectorAll("td");
  tdList[0].innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png">`;
  tdList[1].innerHTML = weather.weather[0].main;
  tdList[2].innerHTML = weather.weather[0].description;
  const absoluteZero = -273.15;
  tdList[3].innerHTML = `${Math.round((weather.main.temp + absoluteZero) * 10) / 10}℃`;
  tdList[4].innerHTML = `${Math.round((weather.main.temp_min + absoluteZero) * 10) / 10}℃`;
  tdList[5].innerHTML = `${Math.round((weather.main.temp_max + absoluteZero) * 10) / 10}℃`;
  tdList[6].innerHTML = `${weather.main.humidity}%`;
  tdList[7].innerHTML = `${weather.main.pressure}hPa`;
  tdList[8].innerHTML = new Date(json.city.sunrise * 1000).toLocaleTimeString("ja-JP");
  tdList[9].innerHTML = new Date(json.city.sunset * 1000).toLocaleTimeString("ja-JP");

  const tableHead = document.querySelector("#app thead tr th");
  tableHead.innerHTML = `${json.city.name}の天気`;
};

requestWetherApi("tokyo");

document.getElementById("serch-btn").addEventListener("click", () => {
  const serchWord = document.getElementById("serch-form").value;
  requestWetherApi(serchWord);
});

//https://openweathermap.org/weather-data#5days
