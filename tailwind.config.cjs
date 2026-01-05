// react native metro doesnt support esm and typescript
// we need to use commonjs here
// this file will be bundled with feature runtime style
// need to use .cjs extension to make nextjs happy

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

// export babel and twrnc config to explicy import and use with twrnc
// babel config should be moved to the plugin options but we keep it here for now
const extra = {
  twrnc,
  codegen: {
    twFn: 'tw',
    cvaFn: 'cva',
    clsxFn: 'clsx',
    output: 'src/codegen/class-names.min.json',
  },
}

const { merge } = require('lodash')

module.exports = merge({ extra }, twrnc, tailwind)
