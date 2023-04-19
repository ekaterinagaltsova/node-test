const express = require('express');

const router = express.Router();

const getNews = require('../controllers/news');

/* GET users listing. */
router.get('/', getNews);

module.exports = router;
