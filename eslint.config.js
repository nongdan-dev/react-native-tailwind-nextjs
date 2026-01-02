// eslint doesnt support typescript in this file with commonjs package type
// we need to use commonjs here

require('./z/register')
module.exports = require('./z/eslint-config').config
