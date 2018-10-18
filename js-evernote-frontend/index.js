document.addEventListener('DOMContentLoaded', function(event) {

    let notes;
    let notesContainer = document.getElementById('notes-container');
    let noteContainer = document.getElementById('note-container');

    showNotes();
    
    // show notes ================================================
    function showNotes() {    
        fetch('http://localhost:9393/api/v1/notes')
        .then(response => response.json())
        .then(notesData => {
            notes = notesData;
            
            notesContainer.innerHTML = "";
            
            notesData.forEach(function(note) {
                notesContainer.innerHTML += `<p class="note" data-id="${note.id}">${note.title}</p><hr>`;
            })
        }) // fetch 'GET'
    } // function showNotes
    
    function showNote(note) {
        noteContainer.innerHTML = `<h3 id="${note.id}">${note.title}</h3>
        <p>${note.body}</p>`;
    } // function showNote

    document.addEventListener('click', function(event) {
        if (event.target.className === "note") { //must include class=""
            let clickedNote = notes.filter(function(note) {
                return note.id === parseInt(event.target.dataset.id); //must include data-id
            })

            showNote(clickedNote[0]);
        } // if
    }) // click note
    
    // click new note button =====================================
    function createNote() {
        title = document.getElementById('title');
        body = document.getElementById('body');

        data = {
            title: title.value,
            body: body.value,
            user_id: 1
        }

        fetch(`http://localhost:9393/api/v1/notes`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(response => response.json())
        .then(newNote => {
            showNote(newNote);
            showNotes();
        }) // fetch 'POST'
    } // function createNote

    const newNoteButton = document.getElementById('new-note-btn');
    newNoteButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        noteContainer.innerHTML = `<center><br><form>
        <input id="title" placeholder="Title"><br><br>
            <textarea id="body" placeholder="Body"></textarea><br><br>
            <button id="create-note-btn">✔</button>
            </form></center>`

        createNoteButton = document.getElementById('create-note-btn');
        createNoteButton.addEventListener('click', function(event) {
            event.preventDefault();

            createNote();
        }) // click add note button
    }) // click new note button
    
    // click edit note button ====================================
    function updateNote(id) {
        title = document.getElementById('title');
        body = document.getElementById('body');

        data = {
            title: title.value,
            body: body.value,
            user_id: 1
        }

        fetch(`http://localhost:9393/api/v1/notes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(response => response.json())
        .then(note => {
            showNote(note);
            showNotes();
        }) // fetch 'PATCH'
    } // function updateNote

    const editNoteButton = document.getElementById('edit-note-btn');
    editNoteButton.addEventListener('click', function(event) {
        event.preventDefault();

        noteContainer = document.getElementById('note-container');
        if (noteContainer.innerHTML.includes('h3')) {
            title = noteContainer.querySelector('h3');
            body = noteContainer.querySelector('p');
            id = title.id;

            noteContainer.innerHTML = `<center><br><form>
                <input id="title" value="${title.innerText}"><br><br>
                <textarea id="body">${body.innerText}</textarea><br><br>
                <button id="update-note-btn">✔</button>
                </form></center>`;

            updateNoteButton = document.getElementById('update-note-btn');
            updateNoteButton.addEventListener('click', function(event) {
                event.preventDefault();
                updateNote(id);
            }) // click update note button
        } // if
    }) // click edit note button

    // click delete note button ====================================
    function deleteNote() {
        id = noteContainer.querySelector('h3').id;
    
        fetch(`http://localhost:9393/api/v1/notes/${id}`, {
            method: 'delete',
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
        .then(response => response.json())
        .then(json => {
            noteContainer.innerHTML = "Deleted.";
            showNotes();
        }) // fetch 'DELETE'
    } // functionDeleteNote

    const deleteNoteButton = document.getElementById('delete-note-btn');
    deleteNoteButton.addEventListener('click', function(event) {
        event.preventDefault();

        noteContainer = document.getElementById('note-container');
        if (noteContainer.innerHTML.includes('h3')) {
            deleteNote();
        } // if
    }) // click delete note button

}) // DOMContentLoaded