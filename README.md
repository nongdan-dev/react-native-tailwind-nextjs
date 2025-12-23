# React Native - Tailwind - NextJS

React Native with Tailwind CSS class names, 100% compatible with NextJS App Router SSR stream.

This repository is currently serving as a boilerplate for a full combination example with NextJS. The code is very opinionated and mostly serve as demonstration with no unit tests. We should consider it as a reference and take a deep look before using it in our project.

```tsx
// transpile jsx class names to style object
// transpiled styles are moved to the root scope to avoid object creation on each render
// jsx prop `className` will be normalized and renamed to `style` through a wrapper component
const MyComponent = () => <View className='flex flex-col transition' />
// -> will be transpiled to:
const _style = {
  display: 'flex',
  flexDirection: 'column',
  transition: [
    /* .. */
  ],
  transitionDuration: 200,
  transitionTimingFunction: 'ease-in',
}
const MyComponent = () => <View style={_style} />

//
// support array in jsx
const MyComponent = ({ withTransition, className, ...props }: Props) => (
  <View
    {...props}
    className={['flex flex-col', withTransition && 'transition', className]}
  />
)
// -> will be transpiled to:
const _style1 = {
  /* .. */
}
const _style2 = {
  /* .. */
}
const MyComponent = ({ withTransition, className, ...props }: Props) => (
  <View {...props} style={[_style1, withTransition && _style2, className]} />
)

//
// transpile class names directly to store as a variable
// on web they will be kept as string
const style = tw`flex flex-col transition`
// -> will be transpiled to:
const style = {
  // ..
}

//
// support cva
const button = cva({
  className: '..',
  // support multiple class names
  classNames: {
    button: '..',
    text: '..',
  },
  attributes: {
    // similar to cva variants
    attr1: {
      value1: '..',
    },
    attr2: {
      value2: {
        // support multiple class names
        button: '..',
        text: '..',
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
      // support multiple class names
      classNames: {
        button: '..',
        text: '..',
      },
    },
  ],
})

// similar to the official suggestion from cva:
type Props = Parameters<typeof button>[0]
type Props = Variant<typeof button>

const MyComponent = (variant: Props) => {
  const cn = button(variant)
  return (
    <Pressable className={cn.button}>
      <Text className={cn.text}>CVA Button</Text>
    </Pressable>
  )
}

//
// support clsx
const composed = clsx(
  'flex flex-col',
  withTransition && 'transition',
  className,
)

//
// support runtime conversion from class names to styles, also work on web
// this is not recommended, but can be useful in some cases
// NOTE: these class names are not captured by the babel plugin and postcss-rename
const style = runtimeStyle('flex flex-col')

//
// support runtime conversion from class names to styles in jsx
// this is not recommended, and will be warned during development mode
// NOTE: these class names are not captured by the babel plugin and postcss-rename
const classNameStringFromSomeWhere = 'flex flex-col'
const MyComponent = () => <View className={classNameStringFromSomeWhere} />
```

- All styles are transpiled from string to object at build time using a babel plugin and twrnc under the hood, this will improve performance compared to general twrnc runtime.
- Selectors are handled using hook and have no problem such as twrnc memoBuster. The hook is only needed in react native, thus it will not introduce client component in web.

- `cva` signature is similar to [cva](https://cva.style/docs/getting-started/variants) with some differences and extras. To follow with real life standards and avoid confusion, we will redefine the terms as follows:
  - `Attribute` is similar to a react property. We name it attribute differentiate with other react properties such as event handlers.. An attribute defines a specific characteristic of that component. For example: color, size, shape..
  - `Attribute value` is a value of an attribute. For example with color: red, green, blue..
  - `Variant` is a combination of all attributes with their coresponding values. For example with 2 attributes color and size: color=red size=xs, color=green size=lg.. So if color has 3 values and size has 4 values, the total number of variants is 3x4=12.
  - `Children` is to compose multiple class names for other elements in the same component without calling tw again. All features should be supported in children.

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
    - Add new easing to `transitionTimingFunctionMap` in normalize-style.ts
  - `delay-<number>`
- Support animation using Reanimated:
  - `animate-spin`
  - `animate-ping`
  - `animate-pulse`
  - `animate-bounce`
  - Custom animation:
    - Add new animation to `tailwind.theme.extend` in tailwind.config.cjs
    - Add name to `babel.animation.custom` in tailwind.config.cjs
    - Add new animation to `animationMap` in normalize-style.ts
- Support clamping text:
  - `line-clamp-<number>`
  - `line-clamp-none`
  - Will be transformed to `numberOfLines` and passed through props
- Support placeholder text color:
  - `placeholder-<color>`
  - Will be transformed to `placeholderTextColor` and passed through props
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
  - Styles are runtime generated and injected to head, which overrides the tailwind css.
  - Need to extract style on ssr render, which is incompatible or inefficient with nextjs app router ssr stream.
  - Class names are omited from props.
- We will patch react-native-web to allow className and introduce a new prop to compute className instead of using react native style sheet. Only some critical components are being patched: Text, View, ScrollView, Pressable, TextInput, FlatList. Those components are also exported with reanimated support in react native.
  - Add \_\_rnwClassNameData and className in forwardedProps
  - Add \_\_rnwClassNameData to each components being patched
  - Update logic in createDOMProps to call a global function \_\_rnwClassName. We can not pass function as prop in app router ssr stream. The global function was injected in src/polyfill/react-native.ts
  - There could be better way to handle this, but let's just leave this for now..

### VS Code Intellisense

```json
{
  "tailwindCSS.classFunctions": ["tw", "cva", "clsx"]
}
```

### Monorepo workspace

We keep this repo as a single npm package for now. We can convert it to pnpm workspace with rnx symlink resolver later.

### License: MIT

Contact me at [nam@nongdan.dev](mailto:nam@nongdan.dev)
