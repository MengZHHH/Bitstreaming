const Monk = require('monk');
const mongodb = Monk('mouseisbest.kmdns.net:1033/Stone_5703');

module.exports = mongodb;

