const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});


const Donation = mongoose.model('Donation', {
  title: String,
  description: String,
  amount: Number
});

// const Review = mongoose.model('Review', {
//   description: String,
//   amount: Number,
//   charity: String
// });


module.exports = Donation
