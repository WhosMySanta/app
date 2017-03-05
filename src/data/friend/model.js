import mongoose from 'mongoose';

const Friend = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  wish: String,
  hash: String,
});

const FriendModel = mongoose.model('Friends', Friend);

export default FriendModel;
