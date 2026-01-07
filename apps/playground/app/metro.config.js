/**
 * Copyright (c) 2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// react native metro doesnt support typescript in this file
// we need to use js here

require('./z/register')
module.exports = require('./z/metro-config').config
