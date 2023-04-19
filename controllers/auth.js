const { Op } = require('sequelize');
require('dotenv').config();

const { User } = require('../models');
const { createToken } = require('../middleware/createToken');
const verifyCredentials = require('../middleware/validatingGoogleCredential');

const createUser = async (req, res) => {
  try {
    const { body: { login, email, password } } = req;
    const newUser = {
      login: login.trim(),
      email: email.trim(),
      password,
    };
    if (!newUser.login || !newUser.email || !newUser.password) {
      return res.status(400).json({ message: 'invalid data' });
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { login },
        ],
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'USER_EXIST' });
    }
    const user = await User.create(newUser);

    const token = createToken(user.id);
    return res.status(200).send({ token, user });
  } catch {
    return res.status(400).json({ message: 'REGISTRATION_ERROR' });
  }
};

const login = async (req, res) => {
  try {
    const { body: { email, password } } = req;

    if (!email || !password) {
      return res.status(400).json({ message: 'invalid data' });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'USER_NOT_FOUND' });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid_password' });
    }

    const token = createToken(user.id);

    return res.status(200).send({ token, user });
  } catch {
    return res.status(400).json({ message: 'login_ERROR' });
  }
};

const getUserByToken = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const googleLogin = async (req, res) => {
  try {
    const data = await verifyCredentials(req.body.credential);
    const { email, name, sub } = data;

    const [user] = await User.findOrCreate({
      where: {
        email,
        googleId: sub,
      },
      defaults: {
        login: name,
        email,
        password: 'password',
        avatar: data.picture || null,
        googleId: sub,
      },
    });

    const token = createToken(user.id);

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  createUser,
  login,
  getUserByToken,
  googleLogin,
};
