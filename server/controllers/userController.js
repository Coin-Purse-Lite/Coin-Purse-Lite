// author: @utyvert

const bcrypt = require('bcryptjs');
const User = require('../models/User');

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
        res.redirect('/signup') // does this end the response?


// verifyUser - verify user login - run on login

userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  console.log('verifyUser running');

  User.findOne({username: username})
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password)
          .then((result) => {
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
        return next({ log: 'User is already in database.' });

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
    });
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