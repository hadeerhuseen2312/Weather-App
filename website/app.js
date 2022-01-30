const generateBtn = document.querySelector("#generate");
const zipInput = document.querySelector("#zip");
const userFeelings = document.querySelector("#feelings");
const errSpan = document.querySelector("#errMsg");
let currentDate = new Date();
currentDate = `${currentDate.getDate()} / ${
  currentDate.getMonth() + 1
} / ${currentDate.getFullYear()}`;

const getData = (url = "") => {
  return fetch(url).then((data) => data.json());
};

const postData = (url = "", data = {}) => {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  }).then((data) => data.json());
};

generateBtn.addEventListener("click", () => {
  generateBtn.setAttribute("style", "cursor: progress");
  if (!(zipInput.value === "" || parseInt(zipInput.value) === NaN)) {
    generateBtn.setAttribute("style", "cursor: progress");
    getData(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipInput.value}&lang=en&units=metric&appid=44115f6995f9477ce77dbac223f20100`
    ).then((res) => {
      if (res.cod === "404") showError(res.message);
      else {
        postData("http://localhost:3000/weatherData", {
          date: currentDate,
          temp: res.main.temp,
          userFeelings: userFeelings.value,
        }).then(() => {
          getData("http://localhost:3000/allWeatherData").then((res) => {
            console.log(res);
            updateView(res);
          });
        });
      }
    });
  } else {
    showError("Enter a valid zip code");
    generateBtn.setAttribute("style", "cursor: pointer");
  }
});

let updateView = (data) => {
  let userInput = document.querySelector("#userInput");
  let entryHolder = document.querySelector("#entryHolder");
  let date = document.querySelector("#date");
  let temp = document.querySelector("#temp");
  let content = document.querySelector("#content");

  errSpan.classList.add("hidden");
  userInput.classList.add("hidden");
  generateBtn.classList.add("hidden");
  entryHolder.classList.remove("hidden");

  date.innerHTML = data.date;
  temp.innerHTML = data.temp;
  content.innerHTML = data.userFeelings;
};

let showError = (message) => {
  errSpan.classList.remove("hidden");
  errSpan.innerHTML = message;
};
