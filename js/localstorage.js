var notes = [];

function saveToLocalStorage(note) {
    notes = getExistingNotesLS();
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function getLocalStorageNotes() {
    notes = getExistingNotesLS();

    notes.forEach(function (note) {
        var noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        noteDiv.style.backgroundColor = getRandomBg();

        noteDiv.setAttribute("id", note.id);

        var pin = document.createElement("i");
        pin.classList.add("pin");
        noteDiv.appendChild(pin);

        noteDiv.appendChild(getTitleLS(note));
        noteDiv.appendChild(getTextareaLS(note));
        noteDiv.appendChild(getDateLS(note));
        noteDiv.appendChild(getButtonsLS(note.category));
        // Make the note checked or unchecked
        loadStateLS(noteDiv, note);
        // append new note to noteList
        noteList.appendChild(noteDiv);
    });
}

function getExistingNotesLS() {
    if (localStorage.getItem("notes") === null) {
        // nothing exists
        notes = [];
    } else {
        // Get the existing data
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    return notes;
}

function getTitleLS(note) {
    var noteTitle = document.createElement("li");
    noteTitle.innerText = note.title;
    noteTitle.contentEditable = "true";
    noteTitle.classList.add("note-item");
    noteTitle.addEventListener("focusout", setTitleLS);
    return noteTitle;
}

function getTextareaLS(note) {
    var noteTextArea = document.createElement("textarea");
    var textarea = note.textarea.split("null");

    if (textarea.length > 1) {
        // avoid first null value
        noteTextArea.innerHTML = textarea[1];
    } else {
        noteTextArea.innerHTML = note.textarea;
    }

    noteTextArea.classList.add("note-textarea");
    noteTextArea.addEventListener("keyup", addBulletPoint, true);
    //Save changes made to textarea after focused on inputarea
    noteTextArea.addEventListener("focusout", setTextareaLS, true);

    return noteTextArea;
}

function getDateLS(note) {
    var createInfo = document.createElement("p");
    createInfo.classList.add("create-date");
    createInfo.innerText = note.date;
    return createInfo;
}

function getButtonsLS(category) {
    var btnDiv = document.createElement("div");
    btnDiv.classList.add("btn-div");

    setCheckMarkButton(btnDiv);
    setCategoryOptionsLS(btnDiv, category);
    setDeleteButton(btnDiv);

    return btnDiv;
}

function loadStateLS(noteDiv, note) {
    if (note.state == "checked") {
        noteDiv.classList.toggle("completed");
    }
}

function setTitleLS(e) {
    var noteInfo = e.path[1].innerText.split("\n");
    var id = e.path[1].id;
    var notes = getExistingNotesLS();

    notes.forEach((note) => {
        if (note.id == id) {
            note.title = noteInfo[0];
        }
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

function setTextareaLS(e) {
    var noteInfo = e.path[1].innerText.split("\n");
    var localNote = localStorage.getItem(noteInfo[0]);
    var textarea = localNote + e.path[0].value;
    var id = e.path[1].id;
    var notes = getExistingNotesLS();

    notes.forEach((note) => {
        if (note.id == id) {
            note.textarea = textarea;
        }
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

function setCategoryOptionsLS(btnDiv, category) {
    var categoryButton = document.createElement("select");
    categoryButton.classList.add("category-btn");
    btnDiv.appendChild(categoryButton);

    var categoryOption;
    Object.values(categories).forEach((category) => {
        categoryOption = document.createElement("option");
        categoryOption.innerText = category;
        categoryOption.value = category.toLowerCase();
        if (category == "misc") {
            categoryOption.setAttribute("selected", "selected");
        }
        categoryButton.appendChild(categoryOption);
    });

    categoryButton.value = category; // Set shown category
    categoryButton.addEventListener("change", setCategoryLS);
    categoryButton.appendChild(categoryOption);
}

function setCategoryLS(e) {
    var id = e.path[2].id;
    var category = e.path[0].value;
    var notes = getExistingNotesLS();

    notes.forEach((note) => {
        if (note.id == id) {
            note.category = category;
        }
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

function setStateLS(e) {
    var id = e.id;
    var notes = getExistingNotesLS();

    notes.forEach((note) => {
        if (note.id == id) {
            if (note.state == "unchecked") {
                note.state = "checked";
            } else {
                note.state = "unchecked";
            }
        }
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}

function removeNoteLS(note) {
    notes = getExistingNotesLS();
    var index = notes.findIndex((obj) => obj.title === note[0]);

    if (index !== -1) {
        notes.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notes));
    }
}
