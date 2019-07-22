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
        $(".containerElse").hide();
        $(".container").show();
        getWeather();
    } else {
        $(".containerElse").show();
        $(".container").hide();

    }
    $(".getWeatherButton").click(function () {
        var city = document.querySelector(".cityInput").value;
        localStorage.setItem("userCity", city);
        getWeather();
        $(".containerElse").hide();
        $(".container").show();

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
                var weatherCity = data.name;
                var weatherIcon = data.weather[0].icon;
                var maxTemp=data.main.temp_max;
                var minTemp=data.main.temp_min;
                var humidity=data.main.humidity;
                var pressure=data.main.pressure;
                var sunrise=new Date(data.sys.sunrise);
                var sunset=new Date(data.sys.sunset);
                document.querySelector(".weatherCity").innerText = weatherCity;
                document.querySelector(".weatherTemp").innerText = temp + "°";
                document.querySelector(".weatherImg").setAttribute("src", `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
                document.querySelector(".max-temp .propResult").innerText = maxTemp + "°";
                document.querySelector(".min-temp .propResult").innerText = minTemp + "°";
                document.querySelector(".humidity .propResult").innerText = humidity + "%";
                document.querySelector(".pressure .propResult").innerText = pressure;
                document.querySelector(".sunrise .propResult").innerText = sunrise.getHours() + "." + sunrise.getMinutes();
                document.querySelector(".sunset .propResult").innerText = sunset.getHours() + "." + sunset.getMinutes();


            })
            .catch(error => console.error(error))
    }
});