const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  body: String,
  time: Date,
  repeats: Boolean,
  interval: Number,
});

module.exports = mongoose.model('Post', postSchema);
