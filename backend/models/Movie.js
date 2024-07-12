const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = MovieSchema;
