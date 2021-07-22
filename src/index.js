//require util functions
const {
  map,
  rndm2DigitHex,
  rndm8bit,
  rndmDegree,
  rndmPercent,
  rgbtohsl,
  makeFor2DigitHex,
  hsltorgb,
} = require("./utils");

//regex for colorTypes
const colorRegex = {
  hex: /#/,
  rgb: /rgb\(/,
  rgba: /rgba\(/,
  hsl: /hsl\(/,
  hsla: /hsla\(/,
};

//get type of a color value
function getColorType(value) {
  if (colorRegex.hex.test(value)) return "hex";
  if (colorRegex.rgb.test(value)) return "rgb";
  if (colorRegex.rgba.test(value)) return "rgba";
  if (colorRegex.hsl.test(value)) return "hsl";
  if (colorRegex.hsla.test(value)) return "hsla";
  else return false;
}

//convert color between types
function convertColorString(value, to) {
  //get type of input color
  const type = getColorType(value);

  //convert hex color
  if (type === "hex") {
    //convert hex sting to r, g, b, values
    const r = parseInt("0x" + value.slice(1, 3));
    const g = parseInt("0x" + value.slice(3, 5));
    const b = parseInt("0x" + value.slice(5, 7));

    //check if convert to rgb or rgba
    if (to === "rgb" || to === "rgba") {
      return formatString(to, r, g, b);
    }

    //check if convert to hsl or hsla
    else if (to === "hsl" || to === "hsla") {
      //get h, s, l values from r, g, b values
      const [h, s, l] = rgbtohsl(r, g, b);
      return formatString(to, h, s, l);
    }

    //when to is incorrect or same return original value
    else return value;
  }

  //convert rgb color
  else if (type === "rgb") {
    //convert rgb string to r, g, b, values
    const [r, g, b] = value.slice(4).slice(0, -1).replace(/ /g, "").split(",");

    //check if convert to hex
    if (to === "hex") {
      return formatString(
        "hex",
        makeFor2DigitHex(parseInt(r).toString(16)),
        makeFor2DigitHex(parseInt(g).toString(16)),
        makeFor2DigitHex(parseInt(b).toString(16))
      );
    }

    //check if convert to rgba
    else if (to === "rgba") {
      return formatString("rgba", r, g, b);
    }

    //check if convert to hsl or hsla
    else if (to === "hsl" || to === "hsla") {
      //get h, s, l values from r, g, b values
      const [h, s, l] = rgbtohsl(r, g, b);
      return formatString(to, h, s, l);
    }

    //when to is incorrect or same return original value
    else return value;
  }

  //convert rgba color
  else if (type === "rgba") {
    //convert rgb string to r, g, b, values
    const [r, g, b, a] = value
      .slice(5)
      .slice(0, -1)
      .replace(/ /g, "")
      .split(",");

    //check if convert to hex
    if (to === "hex") {
      return formatString(
        "hex",
        makeFor2DigitHex(parseInt(r).toString(16)),
        makeFor2DigitHex(parseInt(g).toString(16)),
        makeFor2DigitHex(parseInt(b).toString(16))
      );
    }

    //check if convert to rgb
    else if (to === "rgb") {
      return formatString("rgb", r, g, b);
    }

    //check if convert to hsl
    else if (to === "hsl") {
      //get h, s, l values from r, g, b values
      const [h, s, l] = rgbtohsl(r, g, b);
      return formatString("hsl", h, s, l);
    }

    //check if convert to hsla
    else if (to === "hsla") {
      //get h, s, l values from r, g, b values
      const [h, s, l] = rgbtohsl(r, g, b);
      return formatString(to, h, s, l, a);
    }

    //when to is incorrect or same return original value
    else return value;
  }

  //convert hsl color
  else if (type === "hsl") {
    //convert hsl string to r, g, b, values
    const [h, s, l] = value
      .slice(4)
      .slice(0, -1)
      .replace(/ /g, "")
      .replace(/%/g, "")
      .split(",");

    //check if convert to hex, rgb or rgba
    if (to === "hex" || to === "rgb" || to === "rgba") {
      const [r, g, b] = hsltorgb(
        map(h, 0, 360, 0, 1),
        map(s, 0, 100, 0, 1),
        map(l, 0, 100, 0, 1)
      );

      // check if to conervt to hex
      if (to === "hex") {
        return formatString(
          "hex",
          makeFor2DigitHex(parseInt(r).toString(16)),
          makeFor2DigitHex(parseInt(g).toString(16)),
          makeFor2DigitHex(parseInt(b).toString(16))
        );
      }

      //else convert to rgb or rgba
      else {
        return formatString(to, r, g, b);
      }
    }

    //check if convert to hsla
    else if (to === "hsla") {
      return formatString("hsla", h, s, l);
    } 

    //when to is incorrect or same return original value
    else return value;
  }

  //convert hsl color
  else if (type === "hsla") {
    //convert hsl string to r, g, b, values
    const [h, s, l, a] = value
      .slice(5)
      .slice(0, -1)
      .replace(/ /g, "")
      .replace(/%/g, "")
      .split(",");

    //check if convert to hex, rgb or rgba
    if (to === "hex" || to === "rgb" || to === "rgba") {
      const [r, g, b] = hsltorgb(
        map(h, 0, 360, 0, 1),
        map(s, 0, 100, 0, 1),
        map(l, 0, 100, 0, 1)
      );

      // check if to conervt to hex
      if (to === "hex") {
        return formatString(
          "hex",
          makeFor2DigitHex(parseInt(r).toString(16)),
          makeFor2DigitHex(parseInt(g).toString(16)),
          makeFor2DigitHex(parseInt(b).toString(16))
        );
      }

      // check if to conervt to rgb
      else if(to === "rgb") {
        return formatString(to, r, g, b);
      }

      // check if to conervt to rgba
      else if(to === "rgba") {
        return formatString(to, r, g, b, a);
      }
    }

    //check if convert to hsla
    else if (to === "hsl") {
      return formatString("hsl", h, s, l);
    } 

    //when to is incorrect or same return original value
    else return value;
  }

  //return original when color value is not valid
  else return value
}

//formats values to correct color string
function formatString(type, value1, value2, value3, saturation = 1) {
  if (type === "hex") return `#${value1}${value2}${value3}`;
  if (type === "rgb") return `rgb(${value1}, ${value2}, ${value3})`;
  if (type === "rgba")
    return `rgba(${value1}, ${value2}, ${value3}, ${saturation})`;
  if (type === "hsl") return `hsl(${value1}, ${value2}%, ${value3}%)`;
  if (type === "hsla")
    return `hsla(${value1}, ${value2}%, ${value3}%, ${saturation})`;
}

//get random color with type and toggleable saturation
function getRandomColor(type = "hex", saturation = false) {
  if (saturation || type === "rgba" || type === "hsla") {
    if (type === "hex") {
      return formatString(
        "hex",
        rndm2DigitHex(),
        rndm2DigitHex(),
        rndm2DigitHex()
      );
    } else if (type === "rgb" || type === "rgba") {
      return formatString(
        "rgba",
        rndm8bit(),
        rndm8bit(),
        rndm8bit(),
        rndmPercent() / 100
      );
    } else if (type === "hsl" || type === "hsla") {
      return formatString(
        "hsla",
        rndmDegree(),
        rndmPercent(),
        rndmPercent(),
        rndmPercent() / 100
      );
    }
  } else {
    if (type === "hex") {
      return formatString(
        "hex",
        rndm2DigitHex(),
        rndm2DigitHex(),
        rndm2DigitHex()
      );
    } else if (type === "rgb") {
      return formatString("rgb", rndm8bit(), rndm8bit(), rndm8bit());
    } else if (type === "hsl") {
      return formatString("hsl", rndmDegree(), rndmPercent(), rndmPercent());
    }
  }
}

module.exports = {
  colorRegex,
  getColorType,
  formatString,
  getRandomColor,
  convertColorString,
};
