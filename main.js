window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            window.long = position.coords.longitude;
            window.lati = position.coords.latitude;
            const apiCallWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${parseInt(lati)}&lon=${parseInt(long)}&appid=4ec1b7b6b51a6c71cc717bec0ce21ae5&units=metric`;

            getWeather();
            console.log(position);
        });
    }

    function getWeather() {
        //key : 4ec1b7b6b51a6c71cc717bec0ce21ae5q=${city}
        fetch(apiCallWeather)
            .then(response => response.json())
            .then(data => {
                console.log(data) // Prints result from `response.json()` in getRequest
                window.mydata = data;
                var temp = data.main.temp;
                var weatherDescription = data.weather[0].description;
                var weatherIcon = data.weather[0].icon;
                document.querySelector(".weatherResult").innerText = " - " + weatherDescription;
                document.querySelector(".weatherTemp").innerText = temp;
                document.querySelector(".weatherImg").setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
            })
            .catch(error => console.error(error))
    }
});