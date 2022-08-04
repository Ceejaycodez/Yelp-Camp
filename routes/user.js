const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const catchAsync = require('../utilities/catchAsync');
const users = require('../controllers/users');
// const ExpressError = require('../utilities/ExpressError');

router.route('/register').get(users.renderRegister).post(catchAsync(users.register));

router.route('/login').get(users.renderLogin).post(
	passport.authenticate('local', {
		failureFlash: true,
		failureRedirect: '/login',
		failureMessage: true,
		keepSessionInfo: true
	}),
	users.login
);
//'local' startegy is used fro authentication her. Twitter, google e.t.c may also be used

router.get('/logout', users.logout);

module.exports = router;
