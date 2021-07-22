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

### Get type of color

The `getColorType()` function will return the format of the color passed in as argument or `false` if the format is invalid. Internally it uses the `colorRegex` object. 

```js
const { getColorType } = require("colormizer");

getColorType("#11B789") // -> "hex"
getColorType("rgb(7, 208, 253)") // -> "rgb"
getColorType("rgba(35, 148, 12, 1)") // -> "rgba"
getColorType("hsl(56, 17%, 57%)") // -> "hsl"
getColorType("hsla(187, 98%, 55%, 0.56)") // -> "hsla"

getColorType("Some Invalid Color String") // -> false
```
### Color regex

The `colorRegex` object is an object, with regex to identify a type of color format. 
* The regex for hex colors is `/#[a-z,A-Z,0-9]{6}\b/`
* The regex for rgb colors is `/rgb\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\)/`
* The regex for rgba colors is `/rgba\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}, [0-1]{1}(.[0-9]{1,2})?\)/`
* The regex for hsl colors is `/hsl\([0-9]{1,3}, [0-9]{1,3}%, [0-9]{1,3}%\)/`
* The regex for hsla colors is `/hsla\([0-9]{1,3}, [0-9]{1,3}%, [0-9]{1,3}%, [0-1]{1}(.[0-9]{1,2})?\)/`

The object properties are:
```js
{
  hex: /#[a-z,A-Z,0-9]{6}\b/,
  rgb: /rgb\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}\)/,
  rgba: /rgba\([0-9]{1,3}, [0-9]{1,3}, [0-9]{1,3}, [0-1]{1}(.[0-9]{1,2})?\)/,
  hsl: /hsl\([0-9]{1,3}, [0-9]{1,3}%, [0-9]{1,3}%\)/,
  hsla: /hsla\([0-9]{1,3}, [0-9]{1,3}%, [0-9]{1,3}%, [0-1]{1}(.[0-9]{1,2})?\)/,
}
```

### Generate random colors

The `getRandomColor()` function will generate a random color string, valid for usage as a css-color. Without any arguments it will return a random Color, formatted in a hex representation. Optional you can pass in an arguments for the color type and for a color with saturation.

```js
const { getRandomColor } = require("colormizer");

//generate colors without an saturation value
getRandomColor(); // -> #11B789
getRandomColor("hex"); // -> #11B789
getRandomColor("rgb"); // -> rgb(109, 255, 11)
getRandomColor("hsl"); // -> hsl(204, 20%, 8%)

//generate colors with an saturation value
getRandomColor("rgba"); // -> rgba(225, 154, 47, 0.26)
getRandomColor("rgb", true); // -> rgba(209, 207, 14, 0.95)
getRandomColor("hsla"); // -> hsla(191, 7%, 80%, 0.78)
getRandomColor("hsl", true); // -> hsla(83, 41%, 51%, 0.19)
```

### Convert color types

The `convertColor()` function will convert the color format from one type to another (e.g. rgb(10, 187, 65) => hsl(139, 90%, 39%)). The function takes 2 Arguments the original value and the type to convert it to.

```js
const { convertColor } = require("colormizer");

convertColor("rgb(107, 3, 193)", "hex") // -> #6B03C1
convertColor("rgb(107, 3, 193)", "rgba") // -> rgba(107, 3, 193, 1)
convertColor("hsla(17, 61%, 12%, 0.16)", "rgb") // -> rgb(49, 23, 12)

//when only given a color but not a type to convert to it will return the original color
convertColor("rgb(107, 3, 193)") // -> rgb(107, 3, 193)
```


