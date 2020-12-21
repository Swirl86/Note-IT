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
sortCategory.addEventListener("change", sortByCategory);

// Functions
function addNote(e) {
    // Prevent form submit until done
    e.preventDefault();

    if (noteInput.value != "") {
        var noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.style.backgroundColor = getRandomBg();

        var uniqueID = getUniqueId();
        noteDiv.setAttribute("id", uniqueID);

        var pin = document.createElement("i");
        pin.classList.add("pin");
        noteDiv.appendChild(pin);

        var title = getTitle();
        noteDiv.appendChild(getTitle());

        var textArea = getTextArea();
        noteDiv.appendChild(textArea);

        var date = getDateAndTime();
        noteDiv.appendChild(date);

        noteDiv.appendChild(getButtons());

        // Create note object for localstorage
        var note = {
            id: uniqueID,
            title: title.innerText,
            textarea: textArea.value,
            date: date.innerText,
            category: "misc",
            state: "unchecked",
        };
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
        //add changes made to textarea to localstorage
        setTextareaLS(e);
    }
}

function getButtons() {
    var btnDiv = document.createElement("div");
    btnDiv.classList.add("btn-div");

    setCheckMarkButton(btnDiv);
    setCategoryOptions(btnDiv);
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
        // Add/remove class name "completed"
        note.classList.toggle("completed");
        setStateLS(note);
    });
}

// Category options dropdown
function setCategoryOptions(btnDiv) {
    var categoryButton = document.createElement("select");
    categoryButton.classList.add("category-btn");
    btnDiv.appendChild(categoryButton);

    // Get value from categories
    Object.values(categories).forEach((category) => {
        var categoryOption = document.createElement("option");
        categoryOption.innerText = category;
        categoryOption.value = category.toLowerCase();
        if (category == "misc") {
            // First default value when created a new note
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
        /* If this category is not the one selected in dropdown-list
        remove attribute "selected" (if existing).
        Only want the selected category to have set attribute selected*/
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
                // Existing class: note and completed
                note.classList.toggle("completed"); // remove completed class
                setStateLS(note);
            }
        });
        checkAllButton.value = "unchecked";
    } else {
        //check all notes
        noteList.childNodes.forEach(function (note) {
            if (note.classList.length < 2) {
                // Existing class: note
                note.classList.toggle("completed"); // add completed class
                setStateLS(note);
            }
        });
        checkAllButton.value = "checked";
    }
}

function sortByCategory(e) {
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
