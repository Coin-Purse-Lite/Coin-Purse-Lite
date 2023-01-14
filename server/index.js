const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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


