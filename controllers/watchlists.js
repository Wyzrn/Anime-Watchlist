// controllers/listings.js

const express = require('express');
const router = express.Router();

const Watchlist = require('../models/watchlist.js');

router.get('/', (req, res) => {
  res.render('watchlists/index.ejs', {
    user: req.session.user,
  });
});

router.get('/new', (req, res) => {
  res.render('watchlists/new.ejs', {
    user: req.session.user,
  });
});

module.exports = router;