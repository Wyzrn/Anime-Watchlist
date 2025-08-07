// controllers/watchlists.js

const express = require('express');
const router = express.Router();

const Watchlist = require('../models/watchlist.js');

router.get('/', async (req, res) => {
   try {
    const populatedWatchlists = await Watchlist.find({}).populate('owner');
    console.log('Populated Watchlist:', populatedWatchlists);
    
    res.render('watchlists/index.ejs', {
      watchlists: populatedWatchlists,
    });
  
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
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

router.get('/:watchlistId', async (req, res) => {
  try {
    const populatedWatchlists = await Watchlist.findById(
      req.params.watchlistId
    ).populate('owner');
    res.render('watchlists/show.ejs', {
      watchlist: populatedWatchlists,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.delete('/:watchlistId', async (req, res) => {
  try {
    const watchlist = await Watchlist.findById(req.params.watchlistId);
    
    if (watchlist.owner.equals(req.session.user._id)) {
      await watchlist.deleteOne();
      res.redirect('/watchlists');
    } else {
      res.send("You don't have permission to do that.");
    }
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:watchlistId/edit', async (req, res) => {
  try {
    const currentWatchlist = await Watchlist.findById(req.params.watchlistId);
    res.render('watchlists/edit.ejs', {
      watchlist: currentWatchlist,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;