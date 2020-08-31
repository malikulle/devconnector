const express = require("express");
const dotenv = require("dotenv");
const connectDatabse = require("./config/DB.JS");
const router = require("./routes/api/index");
const path = require("path")

//Envioremnt Variables
dotenv.config({
  path: "./config/env/config.env",
});

const app = express(); 

app.use(express.json());
 
connectDatabse();

app.get("/apistart", (req, res) => {
  res.send("API RUNNIG");
});

app.use("/api", router);


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
