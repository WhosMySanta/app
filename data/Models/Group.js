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

exports.getGroupById = (id) =>
  new Promise((resolve, reject) => {
    GroupModel.findOne({id}, (err, group) => {
      err ? reject(err) : resolve(group);
    });
  });

exports.addGroup = ({id, title, description, friends}) => {
  const group = new GroupModel();
  group.id = id;
  group.title = title;
  group.description = description;
  group.friends = friends;
  group.save((err) => {
    if (err) throw new Error(err);
    console.log('Group saved!', group);
  });
};

exports.updateGroup = ({name, surname, age, hobbies, friends, id}) => {
  const modify = {};

  name ? modify.name = name : null;
  surname ? modify.surname = surname : null;
  age ? modify.age = age : null;
  hobbies ? modify.hobbies = hobbies : null;
  friends ? modify.friends = friends : null;

  return new Promise((resolve, reject) => {
    User.update({id: id}, modify, (err, res) => {
      res.id = id;
      err ? reject(err) : resolve(res);
    });
  });
};
