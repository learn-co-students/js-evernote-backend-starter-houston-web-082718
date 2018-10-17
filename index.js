
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", function(event) {
        if (event.target.className === "like-btn") {
            const objectId = event.target.dataset.id
            getOneDataSet(objectId)
        }
    })
    getData()
});

let addToy = document.querySelector(".add-note-form")
addToy.addEventListener("submit", function(event){
    // event.preventDefault()

let data = {
    title: event.target.title.value,
    body: event.target.body.value,
    user: event.target.user.value,
}
    postData(`http://localhost:3000/api/v1/notes`, data)
})

// -----------------------------------------------

function postData(url = `http://localhost:3000/api/v1/notes`, data = {"title": "good",
"body": "stuff",
"user":"bob"}) 
{
    return fetch(url, {
    method: "POST", 
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(data), 
})
}

// -----------------------------------------------

function addNoteToPage(note){
        let slot = document.getElementById("all-notes")
        slot.innerHTML = ""
        slot.innerHTML += 
        `<h2>${note.title}</h2>
        <p>${note.body}</p>`
    }

function addNotesToSidePage(note){
    let slot = document.getElementById("all-notes2")
    slot.innerHTML += 
    `<h2>${note.title}
    <button type="button" class="like-btn" data-id="${note.id}" onClick="">X</button></h2>`
}

// -----------------------------------------------
function getOneDataSet(objectId){
    fetch('http://localhost:3000/api/v1/notes')
    .then(resp => resp.json())
    .then(notes => notes.forEach(note => (note.id === parseInt(objectId)? 
    addNoteToPage(note): console.log("meh"))))
}



function getData(){
fetch('http://localhost:3000/api/v1/notes')
.then(resp => resp.json())
.then(notes => notes.forEach(note => addNotesToSidePage(note)))
}
// -----------------------------------------------