import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import CartController from '../controllers/CartController';
import { UserRole } from '../enums/UserRole';
// import jwt from 'jsonwebtoken';
import {
  requireAuthentication,
  forwardAuthenticated,
} from '../middlewares/authCheck';
const router = express.Router();
// const refreshTokens = []; // should go to redis

router.post('/login', forwardAuthenticated, function (req, res, next) {
  // generate the authenticate method (the anonymous method) and
  //     associate it with the 'local' strategy
  passport.authenticate('local', function (err, user, info) {
    // console.log('before', req.session.cart);
    const tempCart = req.session.cart;
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }

    // req / res held in closure
    req.login(user, function (err) {
      // console.log('before in login', req.session.cart);
      if (err) {
        return next(err);
      } else {
        CartController.addManyItemToCart(tempCart, user.id);
        req.session.cart = [];
        res.redirect('/');
      }
    });
  })(req, res, next);
});

router.route('/register').post(forwardAuthenticated, (req, res) => {
  const { username, email, password, password2, roleType } = req.body;
  // console.log(req.body)
  const errors: string[] = [];
  // check required fields
  if (!username || !email || !password || !password2) {
    errors.push('Please fill in all fields. ');
  }
  // check pwd match
  if (password != password2) {
    errors.push('Passwords do not match. ');
  }
  // TODO: chekc pwd lenth
  if (errors.length != 0) {
    //   req.flash('error_msg', errors);
    return res.status(400).json({ message: errors });
  } else {
    User.findOne({ username }).then((user) => {
      if (user) {
        errors.push('Username already exists. ');
        return res.status(400).json({ message: errors });
      } else {
        const newUser = new User({ username, email, password, roleType });
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json(err.message);
          }
          newUser.password = hashedPassword;
          newUser
            .save()
            .then((user) => {
              return res.redirect('/login');
            })
            .catch((e) => console.log(e));
        });
      }
    });
  }
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect('/');
    }
  });
});

export default router;
