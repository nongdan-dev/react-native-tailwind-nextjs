// this file is required by babel-plugin-tw to transpile class names into style objects
// react native metro doesnt support esm and typescript
// we need to use commonjs here

/** @type {import('twrnc').TwConfig} */
const twrnc = {
  theme: {
    extend: {
      //
    },
  },
}

/** @type {import('tailwindcss').Config} */
const tailwind = {
  theme: {
    extend: {
      //
    },
  },
}

// also export babel and twrnc config to explicy import and use with twrnc
// babel config should be moved to the plugin options but we keep it here for now
const babel = {
  transition: {
    defaultDuration: 150,
    defaultTimingFunction: 'ease-in',
    custom: [],
  },
  animation: {
    custom: [],
  },
  codegen: {
    twFn: 'tw',
    useTwFn: 'useTw',
    twCvaFn: 'twCva',
    output: 'src/codegen/class-names.min.json',
  },
}
const extra = {
  twrnc,
  babel,
}

const { merge } = require('lodash')

module.exports = merge({ extra }, twrnc, tailwind)
