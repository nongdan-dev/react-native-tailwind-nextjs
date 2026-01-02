// react native metro doesnt support typescript in this file
// we need to use commonjs here

require('./z/register')
module.exports = require('./z/babel-config').config
