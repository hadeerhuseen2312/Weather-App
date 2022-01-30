const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
let projectData = {};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("./website"));

app.listen(port, () => {
  console.log(`Server running on localhost: ${port}...`);
});

// Handling GET Request
app.get("/allWeatherData", (request, response) => {
  response.send(projectData);
});

// Handling POST Request
app.post("/weatherData", (request, response) => {
  projectData = request.body;
  console.log(projectData);
  response.send(projectData);
});
