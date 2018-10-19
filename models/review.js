const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});

// var dateTime = require('node-datetime');
// var dt = dateTime.create();
// var formatted = dt.format('Y-m-d H:M:S');

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  codeReview: String,
  gitRepo: String,
  category: String,
  date: {
      type: Date,
      default: Date.now
  }

});

module.exports = Review
