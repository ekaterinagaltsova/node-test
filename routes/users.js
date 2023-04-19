const express = require('express');
const passport = require('passport');

const {
  getCurrentUser,
  createUserNews,
  changeUserInfo,
} = require('../controllers/user');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/:id', getCurrentUser);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  createUserNews,
);
router.patch(
  '/',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  changeUserInfo,
);

module.exports = router;
