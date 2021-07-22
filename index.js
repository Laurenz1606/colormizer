"use strict";
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
    var hex = "0123456789ABCDEF";
    return (hex.charAt(Math.floor(Math.random() * hex.length)) +
        hex.charAt(Math.floor(Math.random() * hex.length)));
}
function map(val, in_min, in_max, out_min, out_max) {
    return ((val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}
var colorRegex = {
    hex: /#/,
    rgb: /rgb\(/,
    rgba: /rgba\(/,
    hsl: /hsl\(/,
    hsla: /hsla\(/,
};
function randomColor(type, saturation) {
    if (type === void 0) { type = "hex"; }
    if (saturation === void 0) { saturation = false; }
    if (saturation || type === "rgba" || type === "hsla") {
        if (type === "hex")
            return "#" + rndm2DigitHex() + rndm2DigitHex() + rndm2DigitHex();
        else if (type === "rgb" || type === "rgba")
            return "rgba(" + rndm8bit() + ", " + rndm8bit() + ", " + rndm8bit() + ", " + rndmPercent() / 100 + ")";
        else if (type === "hsl" || type === "hsla")
            return "hsla(" + rndmDegree() + ", " + rndmPercent() + "%, " + rndmPercent() + "%, " + rndmPercent() / 100 + ")";
    }
    else {
        if (type === "hex")
            return "#" + rndm2DigitHex() + rndm2DigitHex() + rndm2DigitHex();
        else if (type === "rgb")
            return "rgb(" + rndm8bit() + ", " + rndm8bit() + ", " + rndm8bit() + ")";
        else if (type === "hsl")
            return "hsl(" + rndmDegree() + ", " + rndmPercent() + "%, " + rndmPercent() + "%)";
    }
    return "";
}
function convertType(value, to) {
    var type = null;
    if (colorRegex.hex.test(value))
        type = "hex";
    if (colorRegex.rgb.test(value))
        type = "rgb";
    if (colorRegex.rgba.test(value))
        type = "rgba";
    if (colorRegex.hsl.test(value))
        type = "hsl";
    if (colorRegex.hsla.test(value))
        type = "hsla";
    if (type === "hex") {
        var str1 = parseInt("0x" + value.slice(1, 3));
        var str2 = parseInt("0x" + value.slice(3, 5));
        var str3 = parseInt("0x" + value.slice(5, 7));
        if (to === "rgb")
            return "rgb(" + str1 + ", " + str2 + ", " + str3 + ")";
        else if (to === "rgba")
            return "rgba(" + str1 + ", " + str2 + ", " + str3 + ", 1)";
        else if (to === "hsl")
            return "hsl" + RGBToHSL(str1, str2, str3) + ")";
        else if (to === "hsla")
            return "hsla" + RGBToHSL(str1, str2, str3) + ", 1)";
        else
            return value;
    }
    else if (type === "rgb") {
        var _a = value
            .slice(4)
            .slice(0, -1)
            .replace(" ", "")
            .split(","), str1 = _a[0], str2 = _a[1], str3 = _a[2];
        if (to === "hex")
            return "#" + parseInt(str1).toString(16) + parseInt(str2).toString(16) + parseInt(str3).toString(16);
        else if (to === "rgba")
            return "rgba(" + str1 + ", " + str2 + "," + str3 + ", 1)";
        else if (to === "hsl")
            return "hsl" + RGBToHSL(parseInt(str1), parseInt(str2), parseInt(str3)) + ")";
        else if (to === "hsla")
            return "hsla" + RGBToHSL(parseInt(str1), parseInt(str2), parseInt(str3)) + ", 1)";
        else
            return value;
    }
    else if (type === "rgba") {
        var _b = value
            .slice(5)
            .slice(0, -1)
            .replace(/ /g, "")
            .split(","), str1 = _b[0], str2 = _b[1], str3 = _b[2], str4 = _b[3];
        if (to === "hex")
            return "#" + parseInt(str1).toString(16) + parseInt(str2).toString(16) + parseInt(str3).toString(16);
        else if (to === "rgb")
            return "rgb(" + str1 + ", " + str2 + ", " + str3 + ")";
        else if (to === "hsl")
            return "hsl" + RGBToHSL(parseInt(str1), parseInt(str2), parseInt(str3)) + ")";
        else if (to === "hsla")
            return "hsla" + RGBToHSL(parseInt(str1), parseInt(str2), parseInt(str3)) + ", " + str4 + ")";
        else
            return value;
    }
    else if (type === "hsl") {
        var _c = value
            .slice(4)
            .slice(0, -1)
            .replace(/ /g, "")
            .replace(/%/g, "")
            .split(","), str1 = _c[0], str2 = _c[1], str3 = _c[2];
        var _d = HSLToRGB(map(parseInt(str1), 0, 360, 0, 1), map(parseInt(str2), 0, 100, 0, 1), map(parseInt(str3), 0, 100, 0, 1)), r = _d[0], g = _d[1], b = _d[2];
        if (to === "hex") {
            return "#" + parseInt(r.toString()).toString(16) + parseInt(g.toString()).toString(16) + parseInt(b.toString()).toString(16);
        }
        else if (to === "rgb")
            return "rgb(" + r + ", " + g + ", " + b + ")";
        else if (to === "rgba")
            return "rgba(" + r + ", " + g + ", " + b + ", 1)";
        else if (to === "hsla")
            return "hsla(" + str1 + ", " + str2 + "%, " + str3 + "%, 1)";
        else
            return value;
    }
    else if (type === "hsla") {
        var _e = value
            .slice(5)
            .slice(0, -1)
            .replace(/ /g, "")
            .replace(/%/g, "")
            .split(","), str1 = _e[0], str2 = _e[1], str3 = _e[2], str4 = _e[3];
        var _f = HSLToRGB(map(parseInt(str1), 0, 360, 0, 1), map(parseInt(str2), 0, 100, 0, 1), map(parseInt(str3), 0, 100, 0, 1)), r = _f[0], g = _f[1], b = _f[2];
        if (to === "hex") {
            return "#" + parseInt(r.toString()).toString(16) + parseInt(g.toString()).toString(16) + parseInt(b.toString()).toString(16);
        }
        else if (to === "rgb")
            return "rgb(" + r + ", " + g + ", " + b + ")";
        else if (to === "rgba")
            return "rgba(" + r + ", " + g + ", " + b + ", " + str4 + ")";
        else if (to === "hsl")
            return "hsl(" + str1 + ", " + str2 + "%, " + str3 + "%)";
        else
            return value;
    }
    return "";
}

exports.colorRegex = colorRegex;
exports.convertType = convertType;
exports.randomColor = randomColor;
