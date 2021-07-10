function rndm8bit() {
  return Math.floor(Math.random() * 256);
}

function rndmDegree() {
  return Math.floor(Math.random() * 361);
}

function rndmPercent() {
  return Math.floor(Math.random() * 101);
}

function rndm2DigitHex() {
  const hex = "0123456789ABCDEF";
  return (
    hex.charAt(Math.floor(Math.random() * hex.length)) +
    hex.charAt(Math.floor(Math.random() * hex.length))
  );
}

const map = (val, in_min, in_max, out_min, out_max) =>
  ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;

const colorRegex = {
  hex: /#/,
  rgb: /rgb\(/,
  rgba: /rgba\(/,
  hsl: /hsl\(/,
  hsla: /hsla\(/,
};

Object.freeze(colorRegex);

function randomColor(type = "hex", saturation = false) {
  if (saturation || type === "rgba" || type === "hsla") {
    if (type === "hex")
      return `#${rndm2DigitHex()}${rndm2DigitHex()}${rndm2DigitHex()}`;
    else if (type === "rgb" || type === "rgba")
      return `rgba(${rndm8bit()}, ${rndm8bit()}, ${rndm8bit()}, ${
        rndmPercent() / 100
      })`;
    else if (type === "hsl" || type === "hsla")
      return `hsla(${rndmDegree()}, ${rndmPercent()}%, ${rndmPercent()}%, ${
        rndmPercent() / 100
      })`;
  } else {
    if (type === "hex")
      return `#${rndm2DigitHex()}${rndm2DigitHex()}${rndm2DigitHex()}`;
    else if (type === "rgb")
      return `rgb(${rndm8bit()}, ${rndm8bit()}, ${rndm8bit()})`;
    else if (type === "hsl")
      return `hsl(${rndmDegree()}, ${rndmPercent()}%, ${rndmPercent()}%)`;
  }
}

function convertType(value, to) {
  let type = null;
  if (colorRegex.hex.test(value)) type = "hex";
  if (colorRegex.rgb.test(value)) type = "rgb";
  if (colorRegex.rgba.test(value)) type = "rgba";
  if (colorRegex.hsl.test(value)) type = "hsl";
  if (colorRegex.hsla.test(value)) type = "hsla";

  if (type === "hex") {
    let str1 = parseInt("0x" + value.slice(1, 3));
    let str2 = parseInt("0x" + value.slice(3, 5));
    let str3 = parseInt("0x" + value.slice(5, 7));

    if (to === "rgb") return `rgb(${str1}, ${str2}, ${str3})`;
    else if (to === "rgba") return `rgba(${str1}, ${str2}, ${str3}, 1)`;
    else if (to === "hsl") return `hsl${RGBToHSL(str1, str2, str3)})`;
    else if (to === "hsla") return `hsla${RGBToHSL(str1, str2, str3)}, 1)`;
    else return value;
  } else if (type === "rgb") {
    let [str1, str2, str3] = value
      .slice(4)
      .slice(0, -1)
      .replace(" ", "")
      .split(",");
    if (to === "hex")
      return `#${parseInt(str1).toString(16)}${parseInt(str2).toString(
        16
      )}${parseInt(str3).toString(16)}`;
    else if (to === "rgba") return `rgba(${str1}, ${str2},${str3}, 1)`;
    else if (to === "hsl")
      return `hsl${RGBToHSL(parseInt(str1), parseInt(str2), parseInt(str3))})`;
    else if (to === "hsla")
      return `hsla${RGBToHSL(
        parseInt(str1),
        parseInt(str2),
        parseInt(str3)
      )}, 1)`;
    else return value;
  } else if (type === "rgba") {
    let [str1, str2, str3, str4] = value
      .slice(5)
      .slice(0, -1)
      .replace(/ /g, "")
      .split(",");
    if (to === "hex")
      return `#${parseInt(str1).toString(16)}${parseInt(str2).toString(
        16
      )}${parseInt(str3).toString(16)}`;
    else if (to === "rgb") return `rgb(${str1}, ${str2}, ${str3})`;
    else if (to === "hsl")
      return `hsl${RGBToHSL(parseInt(str1), parseInt(str2), parseInt(str3))})`;
    else if (to === "hsla")
      return `hsla${RGBToHSL(
        parseInt(str1),
        parseInt(str2),
        parseInt(str3)
      )}, ${str4})`;
    else return value;
  } else if (type === "hsl") {
    let [str1, str2, str3] = value
      .slice(4)
      .slice(0, -1)
      .replace(/ /g, "")
      .replace(/%/g, "")
      .split(",");
    const [r, g, b] = HSLToRGB(
      map(parseInt(str1), 0, 360, 0, 1),
      map(parseInt(str2), 0, 100, 0, 1),
      map(parseInt(str3), 0, 100, 0, 1)
    );
    if (to === "hex") {
      return `#${parseInt(r).toString(16)}${parseInt(g).toString(16)}${parseInt(
        b
      ).toString(16)}`;
    } else if (to === "rgb") return `rgb(${r}, ${g}, ${b})`;
    else if (to === "rgba") return `rgba(${r}, ${g}, ${b}, 1)`;
    else if (to === "hsla") return `hsla(${str1}, ${str2}%, ${str3}%, 1)`;
    else return value;
  } else if (type === "hsla") {
    let [str1, str2, str3, str4] = value
      .slice(5)
      .slice(0, -1)
      .replace(/ /g, "")
      .replace(/%/g, "")
      .split(",");
    const [r, g, b] = HSLToRGB(
      map(parseInt(str1), 0, 360, 0, 1),
      map(parseInt(str2), 0, 100, 0, 1),
      map(parseInt(str3), 0, 100, 0, 1)
    );
    if (to === "hex") {
      return `#${parseInt(r).toString(16)}${parseInt(g).toString(16)}${parseInt(
        b
      ).toString(16)}`;
    } else if (to === "rgb") return `rgb(${r}, ${g}, ${b})`;
    else if (to === "rgba") return `rgba(${r}, ${g}, ${b}, ${str4})`;
    else if (to === "hsl") return `hsl(${str1}, ${str2}%, ${str3}%)`;
    else return value;
  }
}

function RGBToHSL(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "(" + h + ", " + s + "%, " + l + "%";
}

function HSLToRGB(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

exports.colorRegex = colorRegex;
exports.convertType = convertType;
exports.randomColor = randomColor;
