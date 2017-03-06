import mongoose from 'mongoose';

const Group = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
    unique: true,
    lowercase: true,
    default: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Friend'}],
});

const GroupModel = mongoose.model('Groups', Group);

export default GroupModel;
