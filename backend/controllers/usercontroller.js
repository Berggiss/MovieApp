const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

const UserController = {
  
  // uuden käyttäjän rekisteröinti
  
  async registerUser(req, res, next) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

    } catch (error) {
      console.error('Virhe:', error);
      return res
        .status(500)
        .send('Käyttäjän rekisteröinti epäonnistui.' + error);
    }
  },

  // olemassa olevan käyttäjän autentikaatio
  async authenticateUser(req, res, next) {
    const user = await User.findOne({
      username: req.body.username,
    }).catch((error) => {
      throw error;
    });
    if (!user) {
      res.json({
        success: false,
        message: 'Autentikaatio epäonnistui. Syy 1',
      });
    } else if (user) {
      if (bcrypt.compareSync(req.body.password, user.password) === false) {
        res.json({
          success: false,
          message: 'Autentikaatio epäonnistui. Syy 2',
        });
      } else {
        res.json({
          success: true,
          message: 'Kirjautuminen onnistui!',
          userid: user._id,
        });
      }
    }
  },

  // Lisää/Poistaa käyttäjän valitseman elokuvan omaan taulukkoon, eli tykättyhin

  addNewMovie: async (req, res) => {
    try {
      const userId = req.headers.authorization;
      const user = await User.findById(userId);

      console.log(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const movieId = req.body.movieId;

      console.log(req.body);

      // Tarkistetaan, onko käyttäjä jo tykännyt elokuvasta
      const existingIndex = user.movies.findIndex(
        (movie) => movie.movieId === movieId
      );

      if (existingIndex !== -1) {
        user.movies.splice(existingIndex, 1);
        await user.save();
        return res.status(200).json({ message: 'Movie removed successfully' });
      } else {
        user.movies.push({ movieId: movieId });
        await user.save();
        return res.status(200).json({ message: 'Movie added successfully' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Hakee käyttäjän omat elokuvat, joista tykännyt

  findUserMovies: async (req, res) => {
    try {
      const userId = req.headers.authorization;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Käyttäjää ei löytynyt' });
      }
      const likedMovieIds = user.movies;
      console.log(likedMovieIds);
      res
        .status(200)
        .json({ message: 'Käyttäjän elokuvat', movies: likedMovieIds });
    } catch (error) {
      console.error('Virhe:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Poistaa käyttäjän tietokannasta

  deleteUser: async (req, res) => {
    try {
      const user = req.headers.authorization;

      console.log(user);
      const removedUser = await User.findOneAndRemove({ _id: user });

      if (!removedUser) {
        return res.status(404).send({ error: 'Tietoa ei löydy' });
      }

      res.send(removedUser);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Päivittää tietyn käyttäjän käyttäjänimeä (hieman turha mutta onpanha)

  updateUsername: async (req, res) => {
    try {
      const userId = req.headers.authorization;
      const newUsername = req.body.newUsername;

      await User.findByIdAndUpdate(
        userId,
        { $set: { username: newUsername } },
        { new: true }
      );

      res.status(200).json({ message: 'Arvosana lisätty onnistuneesti' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = UserController;
