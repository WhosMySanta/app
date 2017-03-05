const mongoose = require('mongoose');

const Group = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Friend'}],
  friend: {type: mongoose.Schema.Types.ObjectId, ref: 'Friend'},
});

const GroupModel = mongoose.model('Groups', Group);

exports.getListOfGroups = () =>
  new Promise((resolve, reject) => {
    GroupModel.find({}, (err, groups) => {
      err ? reject(err) : resolve(groups);
    });
  });


exports.addGroup = ({id, title, description, friends}) => {
  const group = new GroupModel();
  group.id = id;
  group.title = title;
  group.description = description;
  // group.friends = friends;
  group.save((err) => {
    if (err) throw new Error(err);
    console.log('saved!');
  });
};

