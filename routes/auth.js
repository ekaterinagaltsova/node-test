const express = require('express');
const passport = require('passport');

const router = express.Router();

const {
  createUser,
  login,
  getUserByToken,
  googleLogin,
} = require('../controllers/auth');
// const { verifyToken } = require('../middleware/verifyToken');

router.post('/sign-up', createUser);
router.post('/sign-in', login);
router.get('/who-i-am', passport.authenticate('jwt', { session: false }), getUserByToken);
router.post('/google', googleLogin);
// router.get('/whoiam', verifyToken, getUserByToken);

module.exports = router;
