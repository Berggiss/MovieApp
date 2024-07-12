/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const userCon = require('../controllers/usercontroller'); // user-reittien kontrolleri

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// rekisteröityminen eli luodaan uudet tunnarit
router.post('/register', userCon.registerUser);

// kirjautuminen eli autentikaatio luoduilla tunnareilla
router.post('/login', userCon.authenticateUser);

// Lisää/poistaa tykkäämän elokuvan
router.post('/addmovie', userCon.addNewMovie);

// Käyttäjän poisto
router.post('/deleteuser', userCon.deleteUser);

// Omien elokuvien hakeminen
router.get('/findmovies', userCon.findUserMovies);

// Käyttäjänimen päivittäminen
router.put('/change', userCon.updateUsername);

module.exports = router;
