// react native metro doesnt support esm and typescript
// we need to use commonjs here

require('./z/register')
module.exports = require('./z/babel-config').config
