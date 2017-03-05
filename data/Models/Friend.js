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

export getFriendById = (id) => {
  return new
};

exports.addFriend = ({id, name, email, wish, hash}) => {
  const friend = new FriendModel();
  friend.id = id;
  friend.name = name;
  friend.email = email;
  friend.wish = wish;
  friend.hash = hash;
  return new Promise((resolve, reject) => {
    friend.save((err, f) => {
      if (err) reject(err);
      console.log('Friend saved!', friend);
      resolve(f._id);
    });
  });
};

exports.updateFriend = ({id, name, email, wish, hash}) => {
  const modify = {};

  name ? modify.name = name : null;
  email ? modify.email = email : null;
  wish ? modify.wish = wish : null;
  hash ? modify.hash = hash : null;

  return new Promise((resolve, reject) => {
    Friend.update({id: id}, modify, (err, res) => {
      res.id = id;
      err ? reject(err) : resolve(res);
    });
  });
};
