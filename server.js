const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

let projectData = {};


const PORT_NUNBER = 3000;
const server = app.listen(PORT_NUNBER, () =>{
  console.log("Hello from the server");
})


app.get("/projectData", (req, res) => {
  res.send(projectData);
})

app.post("/projectData", (req, res) => {
  const receivedData = req.body;
  const { temperature, date, userResponse } = receivedData;
  projectData = { temperature, date, userResponse };
  res.send(projectData);
})


