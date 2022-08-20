//set searched city to local storage
let city = localStorage.getItem("City");
//set global variables
var searchButton = $("#searchButton");
//API key
var apiKey = "8d1e4b7245cf1a7fdd063e7bea6ebb12";
//set date using a moment.js call
var today = moment().format("L");

// Function for current weather
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    apiKey,
  function (data) {
    //Create current weather variables
    var conditions = "Conditions: " + data.weather[0].main;
    var weatherIcon =
      "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    var currentTemp = "Temperature: " + data.main.temp + " ℉";
    var humidity = "Humidity: " + data.main.humidity + "%";
    var windSpeed = "Wind Speed: " + data.wind.speed + " mph";

    //get data for latitude and longitude
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    $(".conditions").html(conditions);
    $(".weather-icon").attr("src", weatherIcon);
    $("#temperature").html(currentTemp);
    $("#humidity").html(humidity);
    $("#wind-speed").html(windSpeed);

    //five day forecast
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=current,minutely,hourly,alers&units=imperial&appid=" +
        apiKey,

      function (data) {
        //UV Index color coordinated by severity
        var uvIndex = data.daily[0].uvi;

        if (data.daily[0].uvi < 3) {
          $(".uv-index").html("UV Index: " + uvIndex);
          $(".uv-index").css("background-color", "rgb(37, 190, 37)");
        }
        if (data.daily[0].uvi >= 3 && data.daily[0].uvi < 6) {
          $(".uv-index").html("UV Index: " + uvIndex);
          $(".uv-index").css("background-color", "rgb(247, 247, 16)");
        }
        if (data.daily[0].uvi >= 6 && data.daily[0].uvi < 8) {
          $(".uv-index").html("UV Index: " + uvIndex);
          $(".uv-index").css("background-color", "orange");
        }
        if (data.daily[0].uvi >= 8 && data.daily[0].uvi < 11) {
          $(".uv-index").html("UV Index: " + uvIndex);
          $(".uv-index").css("background-color", "red");
        }
        if (data.daily[0].uvi >= 11) {
          $(".uv-index").html("UV Index: " + uvIndex);
          $(".uv-index").css("background-color", "rgb(174, 9, 207)");
        }

        //Day of the week + date for 5 consecutive days starting today
        let dayOne = moment().format("ddd MMM Do");
        let dayTwo = moment().add(1, "d").format("ddd MMM Do");
        let dayThree = moment().add(2, "d").format("ddd MMM Do");
        let dayFour = moment().add(3, "d").format("ddd MMM Do");
        let dayFive = moment().add(4, "d").format("ddd MMM Do");

        //Access daily weather icon from API
        let dayOneIcon =
          "https://openweathermap.org/img/w/" +
          data.daily[0].weather[0].icon +
          ".png";
        let dayTwoIcon =
          "https://openweathermap.org/img/w/" +
          data.daily[1].weather[0].icon +
          ".png";
        let dayThreeIcon =
          "https://openweathermap.org/img/w/" +
          data.daily[2].weather[0].icon +
          ".png";
        let dayFourIcon =
          "https://openweathermap.org/img/w/" +
          data.daily[3].weather[0].icon +
          ".png";
        let dayFiveIcon =
          "https://openweathermap.org/img/w/" +
          data.daily[4].weather[0].icon +
          ".png";

        //Display daily weather icon from source
        $("#fImg0").attr("src", dayOneIcon);
        $("#fImg1").attr("src", dayTwoIcon);
        $("#fImg2").attr("src", dayThreeIcon);
        $("#fImg3").attr("src", dayFourIcon);
        $("#fImg4").attr("src", dayFiveIcon);

        //Creates values for day of week, weather condition, high, low, and humidity
        var day1 = "<br>" + dayOne + "<br>";
        var day1weather =
          data.daily[0].weather[0].main +
          "<br>" +
          "High - " +
          data.daily[0].temp.max +
          " ℉" +
          "<br>" +
          "Low - " +
          data.daily[0].temp.min +
          " ℉" +
          "<br>" +
          "Humidity - " +
          data.daily[0].humidity +
          "%" +
          "<br>";
        var day2 = "<br>" + dayTwo + "<br>";
        var day2weather =
          data.daily[1].weather[0].main +
          "<br>" +
          "High - " +
          data.daily[1].temp.max +
          " ℉" +
          "<br>" +
          "Low - " +
          data.daily[1].temp.min +
          " ℉" +
          "<br>" +
          "Humidity - " +
          data.daily[1].humidity +
          "%" +
          "<br>";
        var day3 = "<br>" + dayThree + "<br>";
        var day3weather =
          data.daily[2].weather[0].main +
          "<br>" +
          "High - " +
          data.daily[2].temp.max +
          " ℉" +
          "<br>" +
          "Low - " +
          data.daily[2].temp.min +
          " ℉" +
          "<br>" +
          "Humidity - " +
          data.daily[2].humidity +
          "%" +
          "<br>";
        var day4 = "<br>" + dayFour + "<br>";
        var day4weather =
          data.daily[3].weather[0].main +
          "<br>" +
          "High - " +
          data.daily[3].temp.max +
          " ℉" +
          "<br>" +
          "Low - " +
          data.daily[3].temp.min +
          " ℉" +
          "<br>" +
          "Humidity - " +
          data.daily[3].humidity +
          "%" +
          "<br>";
        var day5 = "<br>" + dayFive + "<br>";
        var day5weather =
          data.daily[4].weather[0].main +
          "<br>" +
          "High - " +
          data.daily[4].temp.max +
          " ℉" +
          "<br>" +
          "Low - " +
          data.daily[4].temp.min +
          " ℉" +
          "<br>" +
          "Humidity - " +
          data.daily[4].humidity +
          "%" +
          "<br>";

        //Displays date + weather values in daily containers, before and after weather icon
        $("#d1").html(day1);
        $("#d1-1").html(day1weather);
        $("#d2").html(day2);
        $("#d2-1").html(day2weather);
        $("#d3").html(day3);
        $("#d3-1").html(day3weather);
        $("#d4").html(day4);
        $("#d4-1").html(day4weather);
        $("#d5").html(day5);
        $("#d5-1").html(day5weather);
      }
    );
  }
);
//Add new list element to Recent Searches list after submitting search
$("#searchButton").click(function (e) {
  e.preventDefault();
  let cityName = $("#search-city").val();
  localStorage.setItem("City", cityName);
  $(".currentLocation").html("Current Weather - " + cityName);
  $("#search-city").val("");
  let listEl = $("<li>");
  listEl.text(cityName);
  listEl.addClass("list-group-item");
  $(".list-group").append(listEl);
  citySearch(cityName);

  //Search prior city when clicked from search history list
  listEl.click(function (e) {
    let city = cityName;
    citySearch(city);
    $(".currentLocation").html("Current Weather - " + city);
  });
});
