//map value between new range
function map(val, in_min, in_max, out_min, out_max) {
  return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

//generates a random value(bit) between 0-255
function rndm8bit() {
  return Math.floor(Math.random() * 256);
}

//generate a random value(degree) between 0-360
function rndmDegree() {
  return Math.floor(Math.random() * 361);
}

//generate a random value(percent) between 0-100
function rndmPercent() {
  return Math.floor(Math.random() * 101);
}

//generate a random value(2 Digit Hex) between 00-FF
function rndm2DigitHex() {
  var hex = "0123456789ABCDEF";
  return (
    hex.charAt(Math.floor(Math.random() * hex.length)) +
    hex.charAt(Math.floor(Math.random() * hex.length))
  );
}

//adds a "0" to a single digit hex value and returns the string with toUpperCase() formatted
function makeFor2DigitHex(value) {
  return value.length === 1 ? "0" + value.toUpperCase() : value.toUpperCase();
}

//convert rgb values to hsl
function rgbtohsl(r, g, b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;
  // Find greatest and smallest channel values
  var cmin = Math.min(r, g, b),
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
  return [Math.round(h), Math.round(s), Math.round(l)];
}

function hsltorgb(h, s, l) {
  var r, g, b;
  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

//formats values to correct color string
function formatColorString(type, value1, value2, value3, saturation = 1) {
  if (type === "hex") return `#${value1}${value2}${value3}`;
  if (type === "rgb") return `rgb(${value1}, ${value2}, ${value3})`;
  if (type === "rgba")
    return `rgba(${value1}, ${value2}, ${value3}, ${saturation})`;
  if (type === "hsl") return `hsl(${value1}, ${value2}%, ${value3}%)`;
  if (type === "hsla")
    return `hsla(${value1}, ${value2}%, ${value3}%, ${saturation})`;
}

module.exports = {
  map,
  rndm8bit,
  rndmDegree,
  rndmPercent,
  rndm2DigitHex,
  rgbtohsl,
  hsltorgb,
  makeFor2DigitHex,
  formatColorString
};
