'use strict';

// Selectors
var noteInput = document.querySelector(".note-input");
var noteButton = document.querySelector(".note-button");
var noteList = document.querySelector(".note-list");

// Event listenere
noteButton.addEventListener('click', addNote);


// Functions
function addNote(e) {
    // Prevent form submit untill done
    e.preventDefault();
    var validForm = document.forms["post-form"].checkValidity();
    // Dont add empty notes
    if (validForm) {
        var noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.style.backgroundColor = getRandomBg();

        /* **** Add Title **** */
        noteDiv.appendChild(addTitle());
        /* **** Add Textarea **** */
        noteDiv.appendChild(addTextArea());
        /* **** Add Buttons **** */
        noteDiv.appendChild(addButtons());

        // append new note to noteList
        noteList.appendChild(noteDiv);

        // Empty input
        noteInput.value = "";

    } else {
        alert("Enter note title!");
    }
}

function addTitle() {
    var newNote = document.createElement('li');
    newNote.innerText = noteInput.value;
    newNote.contentEditable = 'true';
    newNote.classList.add('note-item');
    return newNote;
}

function addTextArea() {
    var noteTextArea = document.createElement('textarea');
    noteTextArea.placeholder = "Enter note text ... ";
    noteTextArea.classList.add('note-textarea');
    return noteTextArea;
}

function addButtons() {
    // Button div to get buttons on same row
    var btnDiv = document.createElement("div");
    btnDiv.classList.add("btn-div");

    // Checkmark button
    var completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    btnDiv.appendChild(completedButton);

    completedButton.addEventListener('click', function (e) {
        var theNote = e.path[2];
        // add/remove class name "completed" for the Note
        theNote.classList.toggle('completed');
    });

    // Delete button
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-btn");
    btnDiv.appendChild(deleteButton);

    deleteButton.addEventListener('click', function (e) {
        var theNote = e.path[2];
        theNote.remove();
    });

    return btnDiv;
}

/* Random note BackGround color */
function getRandomBg() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
