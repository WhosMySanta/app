const path = require('path');
const getbabelRelayPlugin = require('babel-relay-plugin');
const schema = require(path.join(__dirname, '../data/schema.json'));

module.exports = getbabelRelayPlugin(schema.data);
