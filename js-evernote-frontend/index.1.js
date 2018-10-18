document.addEventListener('DOMContentLoaded', function(event) {

    fetch('http://localhost:9393/api/v1/notes')
    .then(response => response.json())
    .then(json => showNotes(json));


    // show notes ================================================

    function showNotes(notes) {
        const notesContainer = document.getElementById('notes-container');

        notes.forEach(function(note) {
            notesContainer.innerHTML += `<p class="note-li" data-id="${note.id}">${note.title}</p><hr>`
        })

        document.addEventListener('click', function(event) {
            event.preventDefault();
            // debugger;
            // console.log(event.target.dataset.id)
            if (event.target.className === "note-li") {
                // console.log("class note-li")
                notePreview = document.getElementById('note-preview');

                // debugger;
                let filteredNotes = notes.filter(function(element) {
                    return element.id === parseInt(event.target.dataset.id)
                })

                console.log(notes)
                console.log(filteredNotes)

                notePreview.innerHTML = `<h3 id="${filteredNotes[0].id}">${filteredNotes[0].title}</h3>
                    <p>${filteredNotes[0].body}</p>`
            }
        }) // document.addEventListener click note

    } // function showNotes


    // click new note button =====================================

    const newNoteButton = document.getElementById('new-note-btn');
    newNoteButton.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('new note button')
        
        newNote = document.getElementById('note-preview');

        newNote.innerHTML = `<center><br><form>
            <input id="title" placeholder="Title"><br><br>
            <textarea id="body" placeholder="Body"></textarea><br><br>
            <button id="create-note-btn">✔</button>
            </form></center>`

        addNoteButton = document.getElementById('create-note-btn');
        addNoteButton.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('add note button')

            title = document.getElementById('title')
            body = document.getElementById('body')

            // debugger;

            data = {
                    title: title.value,
                    body: body.value,
                    user_id: 1
            }

            // debugger

            fetch(`http://localhost:9393/api/v1/notes`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(response => response.json())
            .then(json => showNote(json))

            function showNote(lastNote) {
                notePreview = document.getElementById('note-preview');
                console.log(notes)

                notePreview.innerHTML = `<h3 id="${lastNote.id}">${lastNote.title}</h3>
                    <p>${lastNote.body}</p>`
            }


        }) //document.addEventListener click add note button

    }) //document.addEventListener click new note button


    // click edit note button ====================================

    editNoteButton = document.getElementById('edit-note-btn');
    editNoteButton.addEventListener('click', function(event) {
        event.preventDefault();
        // console.log(event.target);

        notePreview = document.getElementById('note-preview');
        if (notePreview.innerHTML.includes('<h3')) {
            // console.log('no form!')
            title = notePreview.querySelector('h3');
            body = notePreview.querySelector('p');
            id = title.id;
            console.log(title.innerText);
            console.log(title.id)
            console.log(id);


            notePreview.innerHTML = `<center><br><form>
                <input id="title" value="${title.innerText}"><br><br>
                <textarea id="body">${body.innerText}</textarea><br><br>
                <button id="create-note-btn">✔</button>
                </form></center>`

            addNoteButton = document.getElementById('create-note-btn');
            addNoteButton.addEventListener('click', function(event) {
                event.preventDefault();
                console.log('add note button')
    
                title = document.getElementById('title')
                body = document.getElementById('body')
    
                // debugger;
    
                data = {
                        title: title.value,
                        body: body.value,
                        user_id: 1
                }
    
                // debugger
    
                fetch(`http://localhost:9393/api/v1/notes/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(data),
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                }).then(response => response.json())
                .then(json => showNote(json))
    
                function showNote(lastNote) {
                    notePreview = document.getElementById('note-preview');
                    console.log(notes)
    
                    notePreview.innerHTML = `<h3 id="${lastNote.id}">${lastNote.title}</h3>
                        <p>${lastNote.body}</p>`
                }
            })
        }
    }) //document.addEventListener click edit note button


    // click delete note button ====================================

    deleteNoteButton = document.getElementById('delete-note-btn');
    deleteNoteButton.addEventListener('click', function(event) {
        event.preventDefault();
        // console.log(event.target);

        notePreview = document.getElementById('note-preview');
        if (notePreview.innerHTML.includes('<h3')) {
            // console.log('no form!')
            title = notePreview.querySelector('h3');
            body = notePreview.querySelector('p');
            id = title.id;
    
                // debugger
    
            fetch(`http://localhost:9393/api/v1/notes/${id}`, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }).then(response => response.json())
            .then(json => clearNote())

            function clearNote() {
                notePreview.innerHTML = ""
            }
        }
    
    }) //document.addEventListener click delete note button

}) //document.addEventListener DOMContentLoaded