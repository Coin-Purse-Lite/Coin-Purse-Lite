const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userController = require("./controllers/userController");
const apiController = require("./controllers/apiController");

const port = process.env.PORT || 3001; // set port - default 3000 - used for Heroku app hosting
const mongoURI = (process.env.NODE_ENV = ""); // SET MONGODB URI HERE

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.use(cors());
app.use(express.json()); // to handle json data in request bodies
app.use(express.urlencoded());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.use(express.static("/"));

//controller to handle post request from "add" coin feature in front end. This adds ticker to user watchlist, and returns whole user
app.post(
  "/dashboard/search",
  userController.checkDB,
  userController.addTicker,
  (req, res) => {
    console.log(res.locals.user);
    res.json(res.locals.user);
  }
);

// routing for login

app.post(
  "/login",
  userController.checkDB,
  userController.verifyUser,
  apiController.getUserApiData,
  (req, res) => {
    console.log("login working");

    //returning res.locals to give user info + relevant coin data
    res.status(200).json(res.locals);
  }
);

// routing for signup

app.post("/signup", userController.createUser, (req, res) => {
  console.log("signup working");
  res.status(200).json(res.locals.user);
});

//routing for the dashboard. sends back to the front-end the users relevant coin info based on tickers is User.marketlist
//is a post request, because it expects to receive the current username to find user via userController.checkDB
app.post(
  "/dashboard",
  userController.checkDB,
  apiController.getUserApiData,
  (req, res) => {
    res.status(200).json(res.locals.coinInfo);
  }
);

// routing for removing ticker from user watchlist
//expects username and ticker in req body
app.put(
  "/dashboard/delete",
  userController.checkDB,
  userController.removeTicker,
  (req, res) => {
    res.status(200).json(res.locals.updatedUser);
  }
);

// 404 error handler

app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  console.log(err);
  // if err.type === 'redirect' res.redirect(err.url)
  res.status(500).send({ error: err });
});

// listen to port

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
