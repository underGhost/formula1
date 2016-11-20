var _ = require('lodash');
var config = require('./cfg/base');
var devConfig = require('./cfg/dev');
var prodConfig = require('./cfg/prod');
var isDeveloping = process.env.NODE_ENV !== 'production';

_.merge(config, isDeveloping ? devConfig : prodConfig);

module.exports = config;
