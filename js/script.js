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
    checkUserCity();
    $(".getWeatherButton").click(function () {
        var city = document.querySelector(".cityInput").value;
        localStorage.setItem("userCity", city);
        getWeather();
        weatherResultsShow();
    });
    $(".container .main").click(function (event) {
        weatherResultsHide();
        $(".cityInput").removeClass("error");
    });
    $(".closeButton").click(function () {
        checkUserCity();
    });
    function checkUserCity() {
        if (localStorage.getItem('userCity') !== null) {
            $(".cityInput").removeClass("error");
            weatherResultsShow();
            getWeather();
        } else {
            weatherResultsHide();
            $(".cityInput").addClass("error");

        }
    }
    function weatherResultsShow() {
        $(".containerElse").hide();
        $(".containerElse").removeClass("active");
        $(".container").show();
    }
    function weatherResultsHide() {
        $(".containerElse").show();
        $(".containerElse").addClass("active");
        $(".container").hide();
    }
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
                var temp = parseInt(mydata.main.temp);
                var weatherCity = data.name;
                var weatherIcon = data.weather[0].icon;
                var maxTemp = parseInt(data.main.temp_max);
                var minTemp = parseInt(data.main.temp_min);
                var humidity = data.main.humidity;
                var pressure = data.main.pressure;
                document.querySelector(".weatherCity").innerText = weatherCity;
                document.querySelector(".weatherTemp").innerText = temp + "°";
                document.querySelector(".weatherImg").setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
                document.querySelector(".max-temp .propResult").innerText = maxTemp + "°";
                document.querySelector(".min-temp .propResult").innerText = minTemp + "°";
                document.querySelector(".humidity .propResult").innerText = humidity + "%";
                document.querySelector(".pressure .propResult").innerText = pressure;
            })
            .catch(error => console.error(error))
    }
});