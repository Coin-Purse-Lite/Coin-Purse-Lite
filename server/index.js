const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userController = require('./controllers/userController');
const apiController = require('./controllers/apiController');

const port = process.env.PORT || 3001; // set port - default 3000 - used for Heroku app hosting
const mongoURI = process.env.NODE_ENV = 'mongodb+srv://coinpurse:lite@coin-purse-lite.v74xndq.mongodb.net/?retryWrites=true&w=majority';

//connecting to our mongoose database
  //username is: coinpurse
  //password is: lite
mongoose.connect(mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to DB"))
.catch(console.error);


app.use(express.json()); // to handle json data in request bodies
app.use(express.urlencoded());
app.use(cookieParser());




app.get('/' ,(req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.use(express.static('/'))


//controller to handle post request from server from search bar use
app.post('/dashboard/search', userController.checkDB, userController.AddTicker, userController.checkDB, apiController.getUserApiData, (req,res) => {
  res.send(200);
})


// routing for login

app.post('/login', userController.verifyUser, (req, res) => { 
  console.log('login working');
  res.send('login');
});

// routing for signup

app.post('/signup', userController.createUser, (req, res) => {
  console.log('signup working');
  res.status(200).json(res.locals.user);
});


// routing for removing ticker from user watchlist
app.put(
  '/dashboard', 
  userController.checkDB,
  userController.removeTicker, 
  (req, res) => {
    res.status(200).json(res.locals.updatedUser)
  }
)




// 404 error handler

app.use('*', (req,res) => {
  res.status(404).send('Not Found');
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


