const requestWetherApi = async () => {
	const query = {
		"city": "tokyo",
		"count": 50,
		"mode": null, //NULL(json) or XML or HTML
	}
	const url = `https://community-open-weather-map.p.rapidapi.com/find?q=${query.city}&cnt=${query.count}&mode=${query.mode}&lon=0&type=link%2C%20accurate&lat=0&units=imperial%2C%20metric`;
	const option =  {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "0eca25fc5bmshbf6bdb1574c6aeep1e9778jsn5bfd6a2c8b28",
			"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
		}
	}
	const response = await fetch(url, option);
	const json = await response.json()
	const weather = json.list[0].weather;

	for (const item of weather) {
		console.log(item)
	}
}

requestWetherApi()