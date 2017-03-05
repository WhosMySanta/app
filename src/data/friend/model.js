import mongoose from 'mongoose';

const Friend = new mongoose.Schema({
  id: {
    type: String,
    index: true,
    unique: true,
  },
  name: String,
  email: {
    type: String,
    unique: true,
  },
  wish: String,
  username: {
    type: String,
    lowercase: true,
  },
});

const FriendModel = mongoose.model('Friends', Friend);

export default FriendModel;
