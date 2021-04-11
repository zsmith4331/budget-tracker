// Dependencies //
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// Set the port application //
const PORT = process.env.PORT || 8080

// Create express app instance //
const app = express();

// Logger middleware for Express //
app.use(logger("dev"));

// Parse application body as JSON //
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app //
app.use(express.static("public"));

// Connecting to MongoDb //
mongoose.connect("mongodb://localhost/budget", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Requiried Routes //
app.use(require("./routes/api.js"));

// Start server to listen to client requests //
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});