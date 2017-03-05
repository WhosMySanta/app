const mongoose = require('mongoose');

const Friend = new mongoose.Schema({
  id: Number,
  name: String,
  email: String,
  wish: String,
  hash: String,
});

const FriendModel = mongoose.model('Friends', Friend);

exports.getListOfFriends = () => {
  return new Promise((resolve, reject) => {
    FriendModel.find({}, (err, friends) => {
      err ? reject(err) : resolve(friends);
    });
  });
};
