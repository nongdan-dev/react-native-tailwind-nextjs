# React Native - Tailwind - NextJS

React Native with Tailwind CSS class names, 100% compatible with NextJS App Router SSR stream.

This repository is currently serving as a boilerplate for a full combination example with NextJS. The code is very opinionated and mostly serve as demonstration with no unit tests. We should consider it as a reference and take a deep look before using it in our project.

```tsx
// transpile class names directly to style object, with support for transition and animation
// on web they will be kept as string
const flex = tw`flex flex-col transition`
// will be transpiled to:
const flex = {
  display: 'flex',
  flexDirection: 'column',
  transition: ['..'],
  transitionDuration: 200,
  transitionTimingFunction: 'ease-in',
}

// jsx className prop will be transpiled to style on react native using babel-plugin-react-native-classname-to-style
// transpiled styles are moved to the root scope to avoid dynamic object creation on each render
const MyComponent = () => <View className={tw`flex flex-col transition`} />
// will be transpiled to:
const _style = {
  /* .. */
}
const MyComponent = () => <View style={_style} />

// support for selectors using hook
const MyComponent = () => {
  // on web the props simply contains className so it doesnt need to 'use client'
  // on native it will contains handlers if we have selectors such as active: focus:
  const [rootProps, childrenProps] = useTw({
    className: 'group flex flex-col transition active:bg-red-500',
    // with support for children
    children: {
      text: 'text-black transition group-active:text-white',
    },
    // props to compose or support selectors such as disabled: checked: on native
    props: {
      // ..
    },
    childrenProps: {
      text: {
        // ..
      },
    },
  })
  return (
    <Pressable {...rootProps}>
      <Text {...childrenProps.text}>Hello World</Text>
    </Pressable>
  )
}

// support cva style
const useClassNames = twCva({
  // similar to the above
  className: '..',
  children: {
    text: '..',
  },
  attributes: {
    // similar to cva variants
    attr1: {
      value1: '..',
    },
    // with support for children
    attr2: {
      value2: {
        className: '..',
        children: {
          text: '..',
        },
      },
    },
  },
  defaultVariant: {
    // similar to cva defaultVariants
  },
  compoundVariants: [
    // similar to cva compoundVariants
    {
      attr1: 'value1',
      attr2: 'value2',
      className: '..',
      // with support for children
      children: {
        text: '..',
      },
    },
  ],
})
const MyComponent = variant => {
  const [rootProps, childrenProps] = useClassNames({
    variant,
    // similar to the above
    props: {
      // ..
    },
    childrenProps: {
      text: {
        // ..
      },
    },
  })
  // ..
}

// TODO: support component style
const MyComponent = () => {
  return (
    <TwPressable className='group flex flex-col transition active:bg-red-500'>
      <TwText className='text-black transition group-active:text-white'>
        Hello World
      </TwText>
    </TwPressable>
  )
}
```

- All styles are transpiled from string to object at build time using a babel plugin and twrnc under the hood, this will improve performance compared to general twrnc runtime.
- Selectors are handled using hook and have no problem such as twrnc memoBuster. The hook is only needed in react native, thus it will not introduce client component in web.

- `twCva` signature is similar to [cva](https://cva.style/docs/getting-started/variants) with some differences and extras. To follow with real life standards and avoid confusion, we will redefine the terms as follows:
  - `Attribute` is similar to a react property. We name it attribute differentiate with other react properties such as event handlers.. An attribute defines a specific characteristic of that component. For example: color, size, shape..
  - `Attribute value` is a value of an attribute. For example with color: red, green, blue..
  - `Variant` is a combination of all attributes with their coresponding values. For example with 2 attributes color and size: color=red size=xs, color=green size=lg.. So if color has 3 values and size has 4 values, the total number of variants is 3x4=12.
  - `Children` is to compose multiple class names for other elements in the same component without calling tw again. All features should be supported in children.
- The hooks are designed to create other reusable components, props returned from hook should be used once and only for a single time. If we need to make a loop or multiple usages in one big component, create reusable component or use TwComponent instead.

- Support platform selector: `web:`, `ios:`, `android:`, `native:`. It will be striped out at build time if the platform doesnt match.
  - On web we need to define a custom variant in global css to take precedence.
  - Automatically strip out class names that are not compatible in native: `hover:` `cursor-pointer` `select-none`.
- Support color scheme selector: `dark:`, `light:`.
- Support responsive screen size selector: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.
- Support event handler selector: `active:`, `focus:`.
  - Any component with onPressIn onPressOut such as Pressable will support `active:`.
  - Any component with onFocus onBlur such as TextInput will support `focus:`.
- Support props selector: `disabled:`, `checked:`.
  - Need to pass those fields to hook options: props, childrenProps.
- Support group selector: `group-active:`, `group-focus:`, `group-disabled:`, `group-checked:`.
- Support peer selector: `peer-active:`, `peer-focus:`, `peer-disabled:`, `peer-checked:`.
- Support nested selector: `dark:active:text-white`. Nested selector with deeper level will take precedence.
- Support transition using Reanimated:
  - `transition`
  - `transition-all`
  - `transition-colors`
  - `transition-opacity`
  - `transition-shadow`
  - `transition-transform`
  - `transition-none`
  - `transition-[<value>]`
  - `duration-<number>`
  - `duration-initial`
  - `ease-linear`
  - `ease-in`
  - `ease-out`
  - `ease-in-out`
  - `ease-initial`
  - Custom easing:
    - Add new easing to `tailwind.theme.extend` in tailwind.config.cjs
    - Add name to `babel.transition.custom` in tailwind.config.cjs
    - Add new easing to `transitionTimingFunctionMap` in tw.native.ts
  - `delay-<number>`
- Support animation using Reanimated:
  - `animate-spin`
  - `animate-ping`
  - `animate-pulse`
  - `animate-bounce`
  - Custom animation:
    - Add new animation to `tailwind.theme.extend` in tailwind.config.cjs
    - Add name to `babel.animation.custom` in tailwind.config.cjs
    - Add new animation to `animationMap` in tw.native.ts
- Support clamping text:
  - `line-clamp-<number>`
  - `line-clamp-none`
  - Will be transformed to `numberOfLines` and used in tw/components/text.native.tsx
- Support placeholder text color:
  - `placeholder-<color>`
  - Will be transformed to `placeholderTextColor` and used in tw/components/input.native.tsx
  - Under the hood it will get `text-<color>` style using twrnc and map the color to the prop
- Support object fit:
  - `object-contain`
  - `object-cover`
  - `object-fill`
  - `object-none`
  - `object-scale-down`
  - Will be transformed to `resizeMode` and used in tw/components/image.native.tsx
- Unsupported class names will be catched during the transpile process.
- Class names on web can be minified using [postcss-rename](https://github.com/google/postcss-rename) since the babel plugin has captured all usage references.

### Async hook

### I18n

### Theme

### Navigation

### Patch react-native-web

- By default, react-native-web has the following limitation:
  - Styles are dynamic and injected to head, which overrides the tailwind css.
  - Need to extract style on ssr render, which is incompatible or inefficient with nextjs app router ssr stream.
  - Class names are omited from props.
- We will patch react-native-web to allow className and introduce a new prop to compute className instead of using react native style sheet. Only some critical components are being patched: Text, View, ScrollView, Pressable, TextInput, FlatList. Those components are also exported with reanimated support in react native.
  - Add \_\_injectClassNameData and className in forwardedProps
  - Add \_\_injectClassNameData to each components being patched
  - Update logic in createDOMProps to call a global function. We can not pass function as prop in app router ssr stream. The global function was injected in src/polyfill/inject-global-nextjs-client.ts
  - (There could be better way to handle this, but let's just leave this for now.)

### VS Code Intellisense

```json
{
  "tailwindCSS.classFunctions": ["tw", "useTw", "twCva"]
}
```

### Monorepo workspace

We keep this repo as a single npm package for now. We can convert it to pnpm workspace with rnx symlink resolver later.

### License: MIT

Contact me at [nam@nongdan.dev](mailto:nam@nongdan.dev)
