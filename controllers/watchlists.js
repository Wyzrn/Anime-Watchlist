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

router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id;
  await Watchlist.create(req.body);
  res.redirect('/watchlists')
});

module.exports = router;