var categories = {
    misc: "Misc",
    shopping: "Shopping",
    calendar: "Calendar",
    tasks: "Tasks",
};

var dummyData = [{
        title: "DummyData - 1",
    },
    {
        title: "DummyData - 2",
    },
    {
        title: "DummyData - 3",
    },
    {
        title: "DummyData - 4",
    },
    {
        title: "DummyData - 5",
    },
    {
        title: "DummyData - 6",
    },
];

// Adding dummy data on load
document.addEventListener("DOMContentLoaded", function () {
    dummyData.forEach((dataItem) => {
        //If you want to add dummy data, remove comments on row below (row 33)
        //addDummyData(dataItem.title);
    });
});

function addDummyData(title) {
    var noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    noteDiv.style.backgroundColor = getRandomBg();

    var pin = document.createElement("i");
    pin.classList.add("pin");
    noteDiv.appendChild(pin);

    // Title from dummy data
    var noteTitle = document.createElement("li");
    noteTitle.innerText = title;
    noteTitle.contentEditable = "true";
    noteTitle.classList.add("note-item");
    noteDiv.appendChild(noteTitle);

    noteDiv.appendChild(getTextArea());
    noteDiv.appendChild(getDateAndTime());
    noteDiv.appendChild(getButtons());

    // append new note to noteList
    noteList.appendChild(noteDiv);
}
