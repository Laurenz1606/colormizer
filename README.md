# colormizer
[![npm](https://img.shields.io/npm/v/colormizer)](https://www.npmjs.com/package/colormizer)
[![Downloads](https://img.shields.io/npm/dm/colormizer)](https://www.npmjs.com/package/colormizer)
[![node-current](https://img.shields.io/node/v/colormizer)](https://www.npmjs.com/package/colormizer)

[![NPM](https://nodei.co/npm/colormizer.png)](https://www.npmjs.com/package/colormizer)

## Usage
### Installation

You can install colormizer using [npm](https://www.npmjs.com/package/colormizer) or [yarn](https://yarnpkg.com/package/colormizer).

```
//for npm
npm install colormizer

//for yarn
yarn add colormizer
```

### generate Random Colors
The `getRandomColor` function will generate a random color string, valid for usage as a css-color. Without any arguments it will return a random Color, formatted as a hex representation. Optional you can pass in an argument for the color type and for the saturation. 
```js
const { getRandomColor } = require("colormizer")

getRandomColor() // -> Will return a random hex value for example #11B789
getRandomColor("rgb") // -> Will return a rgb value for example 
getRandomColor() // -> Will return a random hex value
```