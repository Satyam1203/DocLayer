// Dependencies
const express = require("express"),
  app = express(),
  cors = require("cors"),
  path = require("path");

// Import routes
// let routes = require("./routes");

// Configure .env file
require("dotenv").config();

// Connecting to database
// require("./models/connect")();

// Middleware function
app.use(cors());
app.use(express.json());

// Routes
// app.use("/api", routes);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

// Activate the server
app.listen(process.env.PORT, () => {
  console.log(`Listening at ${process.env.PORT}`);
});
