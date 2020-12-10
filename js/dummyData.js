var categoryArray = {
  misc: "Misc.",
  example1: "Example1",
  example2: "Example2",
  example3: "Example3",
};

dummyData = [
  {
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
    addDummyData(dataItem.title);
  });
});

function addDummyData(title) {
  // Outer div, to wrap a note, with class-name: note
  var noteDiv = document.createElement("div");
  noteDiv.classList.add("note");
  noteDiv.style.backgroundColor = getRandomBg();

  // Title from dummy data
  var newNote = document.createElement("li");
  newNote.innerText = title;
  newNote.contentEditable = "true"; // Make title Editable
  newNote.classList.add("note-item");
  noteDiv.appendChild(newNote);

  /* **** Add Textarea **** */
  noteDiv.appendChild(addTextArea());
  /* **** Add Buttons **** */
  noteDiv.appendChild(addButtons());

  // append new note to noteList
  noteList.appendChild(noteDiv);
}
