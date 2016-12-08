'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var drawSecretSantas = function drawSecretSantas(users) {
  // Shuffle all the users
  var shuffled = users.sort(function () {
    return Math.floor(Math.random() * users.length);
  });

  // Create new list and just take all the shuffled users
  var gifters = [].concat(_toConsumableArray(shuffled));

  // Create a second list that takes the shuffled gifters ...
  var recipients = [].concat(_toConsumableArray(shuffled));

  // ... and move the first one to the last! We
  // don't want pairs or small groups of the raffle. This keeps it snaky 🐍!
  recipients.push(recipients.shift());

  // Boom, let's raffle! 🎫
  var raffle = users.map(function (user, raffleRound) {
    var gifter = gifters[raffleRound];
    var recipient = recipients[raffleRound];

    return {
      gifter: gifter,
      recipient: recipient
    };
  });

  return raffle;
};

exports.default = drawSecretSantas;