"use strict";

// Selectors
var noteInput = document.querySelector(".note-input");
var noteButton = document.querySelector(".note-button");
var noteList = document.querySelector(".note-list");
var checkAllButton = document.querySelector(".check-all-button");

// Event listenere
noteButton.addEventListener("click", addNote);
checkAllButton.addEventListener("click", checkAllNotes);

// Functions
function addNote(e) {
    // Prevent form submit untill done
    e.preventDefault();

    // Dont add empty notes
    if (noteInput.value != "") {
        var noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.style.backgroundColor = getRandomBg();

        // Add pin to note
        var pin = document.createElement("i");
        pin.classList.add("pin");
        noteDiv.appendChild(pin);

        /* **** Add Title **** */
        noteDiv.appendChild(getTitle());
        /* **** Add Textarea **** */
        noteDiv.appendChild(getTextArea());
        /* **** Add created date and time **** */
        noteDiv.appendChild(getDateAndTime());
        /* **** Add Buttons **** */
        noteDiv.appendChild(getButtons());

        // append new note to noteList
        noteList.appendChild(noteDiv);

        // Empty input
        noteInput.value = "";
    } else {
        alert("Enter note title!");
    }
}

function getTitle() {
    var noteTitle = document.createElement("li");
    noteTitle.innerText = noteInput.value;
    noteTitle.contentEditable = "true";
    noteTitle.classList.add("note-item");
    return noteTitle;
}

function getTextArea() {
    var noteTextArea = document.createElement("textarea");
    noteTextArea.innerText = "✿ Press enter to add bullet points ...";
    noteTextArea.classList.add("note-textarea");
    noteTextArea.addEventListener("keyup", addBulletPoint);
    return noteTextArea;
}

function addBulletPoint(e) {
    if (e.keyCode == 13) {
        e.path[0].value += "-----------------------\n";
        e.path[0].value += "✿ ";
    }
}

function getButtons() {
    // div to get all on same row
    var btnDiv = document.createElement("div");
    btnDiv.classList.add("btn-div");

    // Checkmark button
    var completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    btnDiv.appendChild(completedButton);

    completedButton.addEventListener("click", function (e) {
        var theNote = e.path[2];
        // add/remove class name "completed" for the Note
        theNote.classList.toggle("completed");
    });

    // Category options
    var categoryButton = document.createElement("select");
    categoryButton.classList.add("ctg-btn");
    btnDiv.appendChild(categoryButton);

    Object.values(categoryArray).forEach((val) => {
        var categoryOption = document.createElement("option");
        categoryOption.innerText = val;
        categoryOption.value = val;
        categoryButton.appendChild(categoryOption);
    });

    categoryButton.addEventListener("change", getCategory);

    // Delete button
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    btnDiv.appendChild(deleteButton);

    deleteButton.addEventListener("click", function (e) {
        var theNote = e.path[2];
        theNote.remove();
    });

    return btnDiv;
}

function checkAllNotes() {
    if (checkAllButton.value == "checked") { // uncheck all notes
        noteList.childNodes.forEach(function (note) {
            if (note.classList.length > 1) { // class: note and completed
                note.classList.toggle("completed"); // remove completed class
            }
        });
        checkAllButton.value = "unchecked";
    } else { //check all notes
        noteList.childNodes.forEach(function (note) {
            if (note.classList.length < 2) { // class: note
                note.classList.toggle("completed"); // add completed class
            }
        });
        checkAllButton.value = "checked";
    }
}

//Function to enable category sorting for future features
function getCategory(e) {
    return e.path[0].value;
}

function getDateAndTime() {
    var today = new Date();
    var minutes = today.getMinutes();
    minutes = minutes > 9 ? minutes : '0' + minutes;

    var date = today.getDate() + '/' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var time = today.getHours() + ":" + minutes;

    var createInfo = document.createElement('p');
    createInfo.classList.add("create-date");
    createInfo.innerHTML = date + " " + time;

    return createInfo;
}

/* Random note BackGround color */
function getRandomBg() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = (num >> 8) & 255;
    var b = num & 255;
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
