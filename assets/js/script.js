//set city input to local storage
let city = localStorage.getItem("City");
//API key
var apiKey = "058d7f01e802a6a38145ceba8a650527";
//set date using a moment.js call
var today = moment().format("L");

//set global variables
var searchButton = $("#searchButton");
var cityName = $("#city-name");
var temp = $("#temp");
var wind = $("#wind");
var humidity = $("#humidity");
var uvi = $("#uv-index");
var forecastEl = $("#forecast");

//set variables for each individual day
var date1 = $("#date1");
var temp1 = $("#temp1");
var wind1 = $("#wind1");
var humidity1 = $("#humidity1");

var date2 = $("#date2");
var temp2 = $("#temp2");
var wind2 = $("#wind2");
var humidity2 = $("#humidity2");

var date3 = $("#date3");
var temp3 = $("#temp3");
var wind3 = $("#wind3");
var humidity3 = $("#humidity3");

var date4 = $("#date4");
var temp4 = $("#temp4");
var wind4 = $("#wind4");
var humidity4 = $("#humidity4");

var date5 = $("#date5");
var temp5 = $("#temp5");
var wind5 = $("#wind5");
var humidity5 = $("#humidity5");

//create a function to fetch the api
function fetchApi() {
  fetch(
    "https://api.weatherbit.io/v2.0/current?&city=" +
      cityEl +
      "&units=imperial&key=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      cityName.text(data.data[0].city_name);
      temp.text("temp: " + data.data[0].temp + " *F");
      wind.text("wind: " + data.data[0].wind_spd + " MPH");
      humidity.text("humidity: " + data.data[0].rh + "%");
      uvi.text("UV Index: " + data.data[0].uvi);
    });

  fetch(
    "https://api.weatherbit.io/v2.0/forecast/daily&days=[5]?city=" +
      cityEl +
      "&units=imperial&key=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      date1.text(data.data[0].datetime);

      temp1.text("temp: " + data.data[0].temp + " *F");
      wind1.text("wind: " + data.data[0].wind_spd + " MPH");
      humidity1.text("humidity: " + data.data[0].rh + "%");

      date2.text(data.data[1].datetime);
      temp2.text("temp: " + data.data[1].temp + " *F");
      wind2.text("wind: " + data.data[1].wind_spd + " MPH");
      humidity2.text("humidity: " + data.data[1].rh + "%");

      date3.text(data.data[2].datetime);
      temp3.text("temp: " + data.data[2].temp + " *F");
      wind3.text("wind: " + data.data[2].wind_spd + " MPH");
      humidity3.text("humidity: " + data.data[2].rh + "%");

      date4.text(data.data[3].datetime);
      temp4.text("temp: " + data.data[3].temp + " *F");
      wind4.text("wind: " + data.data[3].wind_spd + " MPH");
      humidity4.text("humidity: " + data.data[3].rh + "%");

      date5.text(data.data[4].datetime);
      temp5.text("temp: " + data.data[4].temp + " *F");
      wind5.text("wind: " + data.data[4].wind_spd + " MPH");
      humidity5.text("humidity: " + data.data[4].rh + "%");
      $("#card-section").show();
    });
}

var today = moment();
$("#day-time").text(today.format("L"));

var inputEl = $("#text");
var historyEl = $("#history-list");
var searchBtnEl = $("#btn");

var printHistory = function (city) {
  var listEl = $("<li>");
  var cityEl = city;
  listEl.addClass("list-group-item").text(cityEl);
  listEl.appendTo(historyEl);
};

function searchCity(event) {
  event.preventDefault();

  var searchInput = inputEl.val();

  if (!searchInput) {
    return;
  }
  cityEl = searchInput;

  printHistory(searchInput);

  // Run the fetch APi
  fetchApi();

  inputEl.val("");
}

searchBtnEl.on("click", searchCity);
$("#card-section").hide();
$(function () {
  $("#history-list").sortable({
    placeholder: "ui-state-highlight",
  });
  $("#history-list").disableSelection();
});
