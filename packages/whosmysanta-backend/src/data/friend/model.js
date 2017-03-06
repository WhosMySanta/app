import mongoose from 'mongoose';

const Friend = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    default: mongoose.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  wish: {
    type: String,
  },
  groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],
});

const FriendModel = mongoose.model('Friends', Friend);

export default FriendModel;
