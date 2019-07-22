window.addEventListener("load", () => {
    
    //if you want to use browser's location
    /*
     if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(position => {
             window.long = position.coords.longitude;
             window.lati = position.coords.latitude;
             const apiCallWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${parseInt(lati)}&lon=${parseInt(long)}&appid=4ec1b7b6b51a6c71cc717bec0ce21ae5&units=metric`;
             getWeather();
             console.log(position);
         });
     }*/
    if (localStorage.getItem('userCity') !== null) {
        $(".userCityBox").hide();
        getWeather();
    } else {
        $(".userCityBox").show();
    }
    $(".getWeatherButton").click(function () {
        var city = document.querySelector(".cityInput").value;
        localStorage.setItem("userCity", city);
        getWeather();
        $(".userCityBox").hide();
    });

    function getWeather() {
        //key : 4ec1b7b6b51a6c71cc717bec0ce21ae5q=${city}
        if (localStorage.getItem("userCity") !== "") {
            var city = localStorage.getItem("userCity");
        } else {
            var city = document.querySelector(".cityInput").value;
        }
        const apiCallWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4ec1b7b6b51a6c71cc717bec0ce21ae5&units=metric`;
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
window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./sw.js');
    }
}