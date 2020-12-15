/* Random note BackGround color */
function getRandomBg() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = (num >> 8) & 255;
    var b = num & 255;
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

// Generate unique id based on the date value
function getUniqueId() {
    return new Date().valueOf();
}
