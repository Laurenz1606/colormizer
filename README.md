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

The `colorRegex` Object is an Object, with regex to identify a type of color format. 
* The regex for hex colors is `/#[a-z,A-Z,0-9]{6}\b/`
* The regex for rgb colors is `/rgb\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\)/`
* The regex for rgba colors is `/rgba\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}, [0-1]{1}(.[0-9]{1,2})?\)/`
* The regex for hsl colors is `/hsl\([0-9]{1,3}, [0-9]{1,3}%, [0-9]{1,3}%\)/`
* The regex for hsla colors is `/hsla\([0-9]{1,3}, [0-9]{1,3}%, [0-9]{1,3}%, [0-1]{1}(.[0-9]{1,2})?\)/`

```js
const { colorRegex } = require("colormizer");

//generate colors without an saturation value
getRandomColor(); //will return a random hex value -> #11B789
getRandomColor("rgb"); //will return a random rgb value -> rgb(109, 255, 11)
getRandomColor("hsl"); //will return a random hsl value -> hsl(204, 20%, 8%)

//generate colors without an saturation value
getRandomColor("rgba"); //will return a random rgba value -> rgba(225, 154, 47, 0.26)
getRandomColor("rgb", true); //will return a random rgba value -> rgba(209, 207, 14, 0.95)
getRandomColor("hsla"); //will return a random hsla value -> hsla(191, 7%, 80%, 0.78)
getRandomColor("hsl", true); //will return a random hsla value -> hsla(83, 41%, 51%, 0.19)
```

### Generate random colors

The `getRandomColor()` function will generate a random color string, valid for usage as a css-color. Without any arguments it will return a random Color, formatted in a hex representation. Optional you can pass in an arguments for the color type and for a color with saturation.

```js
const { getRandomColor } = require("colormizer");

//generate colors without an saturation value
getRandomColor(); //will return a random hex value -> #11B789
getRandomColor("rgb"); //will return a random rgb value -> rgb(109, 255, 11)
getRandomColor("hsl"); //will return a random hsl value -> hsl(204, 20%, 8%)

//generate colors without an saturation value
getRandomColor("rgba"); //will return a random rgba value -> rgba(225, 154, 47, 0.26)
getRandomColor("rgb", true); //will return a random rgba value -> rgba(209, 207, 14, 0.95)
getRandomColor("hsla"); //will return a random hsla value -> hsla(191, 7%, 80%, 0.78)
getRandomColor("hsl", true); //will return a random hsla value -> hsla(83, 41%, 51%, 0.19)
```


