// comment.js
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});
const Schema = mongoose.Schema


const Comment = mongoose.model('Comment', {
  title: String,
  content: String,
  donationId: { type: Schema.Types.ObjectId, ref:'Donation'}
});

module.exports = Comment
