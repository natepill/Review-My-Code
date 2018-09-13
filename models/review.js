const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});


const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: Number
});

module.exports = Review
