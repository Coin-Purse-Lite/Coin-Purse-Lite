// author: @utyvert

const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');


const userController = {};


// checkDB - check if user exists in DB

userController.checkDB = (req, res, next) => {
  const { username } = req.body;
  console.log('checkDB running');

  User.findOne({username: username})
    .then((user) => {
      if (user) {
        res.locals.user = user;
        return next();
      } else {
        return next({ log: 'User is not in database.' });
      }
    })
    .catch((err) => {
      return next({
        log: `Error in userController.checkDB: ${err}`,
        message: { err: 'Error occurred in userController.checkDB. Check server logs for more details.' },
      });
    });
};


// verifyUser - verify user login - run on login

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log('verifyUser running');

  User.findOne({username: username})
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password)
          .then((result) => {
            console.log(console.log());
            console.log(result);
            if (result) {
              res.locals.user = user;
              return next();
            } else {
              res.redirect('/signup') // does this end the response?
              return next({ log: 'Wrong password.' });
            }
          })
          .catch((err) => {
            res.redirect('/signup') // does this end the response?
            return next({
              log: `Error in userController.verifyUser: ${err}`,
              message: { err: 'Error occurred in userController.verifyUser. Check server logs for more details.' },
            });
          });
      } else {
        res.redirect('/signup') // does this end the response?
        return next({ log: 'User is not in database.' });
      }
    })
    .catch((err) => {
      res.redirect('/signup') // does this end the response?
      return next({
        log: `Error in userController.verifyUser: ${err}`,
        message: { err: 'Error occurred in userController.verifyUser. Check server logs for more details.' },
      });
    });
};





//getUserInfo - get user info and populate dashboard - comes after verifyUser


userController.getUserInfo = (req, res, next) => {
  const { username } = req.body;
  console.log('getUserInfo running');

  User.findOne({username: username})
    .then((user) => {
      if (user) {
        res.locals.user = user;
        return next();
      } else {
        res.redirect('/login') // does this end the response?
        return next({ log: 'User is not in database.' });
      }
    })
    .catch((err) => {
      res.redirect('/login') // does this end the response?
      return next({
        log: `Error in userController.getUserInfo: ${err}`,
        message: { err: 'Error occurred in userController.getUserInfo. Check server logs for more details.' },
      })}); // send w/ error log to global error handler

    }


// createUser - create new user

userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log('createUser running');

  //checks to see if username already exists, if so, don't allow create user
  User.findOne({username: username}, (err, user) => {
    if(user === null){
    bcrypt.hash(password, 12) // use 12 instead of 10
    .then((hash) => {
      User.create({username: username, password: hash, watchList: []}) // create user with hashed password
        .then((user) => {
          if (user) {
            res.locals.user = user; // add user to res.locals
            // res.redirect('/dashboard'); // should this take us to dash on backend or frontend?
            return next();
          } else {
            res.redirect('/login') // does this end the response?
            return next({ log: 'User is already in database.' }); // is this the correct error message?
          }
        })
        .catch((err) => {
          next({ log: `Error in userController.createUser: ${err}` });
        });
    })
    .catch((err) => {
      next({ log: `Error in userController.createUser: ${err}` });
    })}else if(user.username === username){
      return next({
        error: err
      })
    }
  })  
};

  //AddTicker -- update user watchlist in database with new ticker from search function
  userController.addTicker = (req, res, next) => {
    //expecting to receive search value(ticker) + user id from body
    const user = res.locals.user;
    const id = user.id;
    const ticker = req.body.ticker;
    const updatedWatchlist = [...user.watchlist]; 
    updatedWatchlist.push(ticker);

    //searches for user by id, and updates said user's watchlist with the new watchlist
    User.findOneAndUpdate({_id: id}, {watchlist: updatedWatchlist},{ new: true }, (err, updatedUser) => {
      if(err){
        console.error(err);
        next({
          error:err
        })
      }else{
        res.locals.user = updatedUser;
        next();
      }

    })
  };

    
  // removeTicker -- removes ticker from user watchlist
  userController.removeTicker = (req, res, next) => {
    console.log('entered removeTicker mmiddleware');
    const ticker = req.body.ticker;
    const user = res.locals.user;
    const id = user.id;
    const updatedWatchlist = [...user.watchlist]; 

    //removes the ticker from the updated watchlist
    const index = updatedWatchlist.indexOf(ticker);
    updatedWatchlist.splice(index, 1);

    //searches for user by id, and updates said user's watchlist with the new watchlist
    User.findOneAndUpdate({_id: id}, {watchlist: updatedWatchlist}, { new: true }, (err, updatedUser) => {
      console.log('updatedUser is ', updatedUser);
      if(err){
        console.error(err);
        next({
          error:err
        })
      }
      res.locals.updatedUser = updatedUser;
      next();
    })
};


// updateUser - update user info ? - run after verifySession/cookie - stretch

// userController.updateUser = (req, res, next) => {
//   const { username, password } = req.body;
//   console.log('updateUser running');

//   bcrypt.hash(password, 12) // use 12 instead of 10
//     .then((hash) => {
//       User.findOneAndUpdate({
//         username: username,
//         password: hash,
//       })




// deleteUser - delete user account ? stretch



module.exports = userController;