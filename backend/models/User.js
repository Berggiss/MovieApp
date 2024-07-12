const mongoose = require('mongoose');

const MovieSchema = require('../models/Movie');

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
  movies: [MovieSchema],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
