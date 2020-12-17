"use strict";

// Selectors
var noteInput = document.querySelector(".note-input");
var noteButton = document.querySelector(".note-button");
var noteList = document.querySelector(".note-list");
var checkAllButton = document.querySelector(".check-all-button");
var sortCategory = document.querySelector(".sort-category-dropdown");

// Event listener
document.addEventListener("DOMContentLoaded", getLocalStorageNotes);
noteButton.addEventListener("click", addNote);
checkAllButton.addEventListener("click", checkAllNotes);
sortCategory.addEventListener("change", categorySorter);

// Functions
function addNote(e) {
    // Prevent form submit until done
    e.preventDefault();

    // Dont add empty notes
    if (noteInput.value != "") {
        var noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.style.backgroundColor = getRandomBg();

        var unique_id_ = getUniqueId();
        noteDiv.setAttribute("id", unique_id_);

        // Add pin to note
        var pin = document.createElement("i");
        pin.classList.add("pin");
        noteDiv.appendChild(pin);

        /* **** Add Title **** */
        var title = getTitle();
        noteDiv.appendChild(getTitle());
        /* **** Add Textarea **** */
        var textArea = getTextArea();
        noteDiv.appendChild(textArea);
        /* **** Add created note date and time **** */
        var date = getDateAndTime();
        noteDiv.appendChild(date);
        /* **** Add Buttons **** */
        noteDiv.appendChild(getButtons());

        // Create note object for localstorage
        var note = {
            id: unique_id_,
            title: title.innerText,
            textarea: textArea.value,
            date: date.innerText,
            category: "misc",
            state: "unchecked",
        };

        // Add to localstorage
        saveToLocalStorage(note);

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
    noteTitle.addEventListener("focusout", setTitleLS);
    return noteTitle;
}

function getTextArea() {
    var noteTextArea = document.createElement("textarea");
    noteTextArea.innerText = "✿ Press enter to add bullet points ...";
    noteTextArea.classList.add("note-textarea");
    noteTextArea.addEventListener("keyup", addBulletPoint, true);
    //Save changes made to textarea after focused on inputarea
    noteTextArea.addEventListener("focusout", setTextareaLS, true);

    return noteTextArea;
}

function addBulletPoint(e) {
    if (e.keyCode == 13) {
        e.path[0].value += "-----------------------\n";
        e.path[0].value += "✿ ";
        //Save changes made to textarea
        setTextareaLS(e);
    }
}

function getButtons() {
    var btnDiv = document.createElement("div");
    btnDiv.classList.add("btn-div");

    // Checkmark button
    setCheckMarkButton(btnDiv);
    // Category options
    setCategoryOptions(btnDiv);
    // Delete button
    setDeleteButton(btnDiv);

    return btnDiv;
}

function setCheckMarkButton(btnDiv) {
    var completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-double"></i>';
    completedButton.classList.add("completed-btn");
    btnDiv.appendChild(completedButton);

    completedButton.addEventListener("click", function (e) {
        var note = e.path[2];
        // add/remove class name "completed" for the Note
        note.classList.toggle("completed");
        setStateLS(note);
    });
}

// Category options dropdown
function setCategoryOptions(btnDiv) {
    var categoryButton = document.createElement("select");
    categoryButton.classList.add("ctg-btn");
    btnDiv.appendChild(categoryButton);

    // Get value from categoryArray
    Object.values(categoryArray).forEach((val) => {
        var categoryOption = document.createElement("option");
        categoryOption.innerText = val;
        categoryOption.value = val.toLowerCase();
        if (val == "misc") {
            categoryOption.setAttribute("selected", "selected");
        }
        categoryButton.appendChild(categoryOption);
    });

    categoryButton.addEventListener("change", setCategoryLS, true);
    categoryButton.addEventListener("change", setCategory, true);
}

function setCategory(e) {
    var nodeList = e.path[0].childNodes;
    nodeList.forEach(function (node) {
        if (!node.selected) {
            node.removeAttribute("selected");
        } else {
            node.setAttribute("selected", "selected");
        }
    });
}

function setDeleteButton(btnDiv) {
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add("delete-btn");
    btnDiv.appendChild(deleteButton);

    deleteButton.addEventListener("click", function (e) {
        var note = e.path[2];
        var noteInfo = note.innerText.split("\n");
        removeNoteLS(noteInfo);
        note.remove();
    });
}

function checkAllNotes() {
    if (checkAllButton.value == "checked") {
        // uncheck all notes
        noteList.childNodes.forEach(function (note) {
            if (note.classList.length > 1) {
                // class: note and completed
                note.classList.toggle("completed"); // remove completed class
                setStateLS(note);
            }
        });
        checkAllButton.value = "unchecked";
    } else {
        //check all notes
        noteList.childNodes.forEach(function (note) {
            if (note.classList.length < 2) {
                // class: note
                note.classList.toggle("completed"); // add completed class
                setStateLS(note);
            }
        });
        checkAllButton.value = "checked";
    }
}

function categorySorter(e) {
    switch (sortCategory.value) {
        case "misc":
            loopThroughNodesForSort("misc");
            break;
        case "shopping":
            loopThroughNodesForSort("shopping");
            break;
        case "calendar":
            loopThroughNodesForSort("calendar");
            break;
        case "tasks":
            loopThroughNodesForSort("tasks");
            break;
        default:
            noteList.childNodes.forEach(function (note) {
                note.style.display = "block";
            });
    }
}

function loopThroughNodesForSort(option) {
    var isSelected = false;
    noteList.childNodes.forEach(function (note) {
        var parentNodes = note.childNodes[4].childNodes[1];
        // Loop through/going into ctg-btn to find matching category value
        parentNodes.childNodes.forEach(function (node) {
            if (option == node.value) {
                isSelected = node.selected;
            }
        });
        setStyleOnSort(note, isSelected);
    });
}

// Display/Hide matching categories depening on categories shown
function setStyleOnSort(note, isSelected) {
    if (isSelected) {
        note.style.display = "block";
    } else {
        note.style.display = "none";
    }
}
