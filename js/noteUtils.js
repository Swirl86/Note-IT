// Random note BackGround color
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

// Create Date and Time element for note
function getDateAndTime() {
    var today = new Date();
    var minutes = today.getMinutes();
    minutes = minutes > 9 ? minutes : "0" + minutes;

    var date =
        today.getDate() +
        "/" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();
    var time = today.getHours() + ":" + minutes;

    var createInfo = document.createElement("p");
    createInfo.classList.add("create-date");
    createInfo.innerHTML = date + " " + time;

    return createInfo;
}
