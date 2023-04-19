const jwt = require('jsonwebtoken');
// require('dotenv').config();

const createToken = (id) => jwt.sign(id, process.env.SECRET_KEY);

module.exports = { createToken };
