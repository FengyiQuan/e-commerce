import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import CartController from '../controllers/CartController';
import { UserRole } from '../enums/UserRole';
import { IUserModel } from '../models/User';
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
  passport.authenticate('local', function (err, user, message) {
    const tempCart = req.session.cart;
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ ...message });
    }

    // req / res held in closure
    req.login(user, function (err) {
      if (err) {
        return next(err);
      } else {
        CartController.addManyItemToCart(tempCart, user.id);
        req.session.cart = [];
        return res.redirect('/');
      }
    });
  })(req, res, next);
});

router.route('/register').post(forwardAuthenticated, async (req, res) => {
  const {
    username,
    email,
    password,
    password2,
    roleType,
  }: IUserModel & { password2: string } = req.body;

  const errors: string[] = [];
  if (!username || !email || !password || !password2) {
    errors.push('Please fill in all fields. ');
  }

  // check pwd match
  if (password != password2) {
    errors.push('Passwords do not match. ');
  }
  // TODO: chekc pwd lenth

  try {
    // check if user exists
    if (await User.exists({ username })) {
      errors.push('Username already exists. ');
    }
    if (errors.length != 0) {
      return res.status(400).json({ message: errors });
    } else {
      const newUser = new User({ username, email, password, roleType });
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        newUser.password = hashedPassword;
        const savedUser = await newUser.save();
        return res.redirect('/login');
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      return res.redirect('/');
    }
  });
});

export default router;
