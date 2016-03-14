const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  authorized: Boolean,
});

userSchema.statics.findOrCreate = function findOrCreate(username, cb) {
  const User = this.model('User');

  User.findOne({ username }, (err, user) => {
    if (err || user !== null) {
      cb(err, null);
    } else {
      const newUser = new User({ username, authorized: false });

      newUser.save((saveErr, saveUser) => {
        cb(saveErr, saveUser);
      });
    }
  });
};

module.exports = mongoose.model('User', userSchema);
