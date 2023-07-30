import httpService from './httpService';

function getNotes() {
    return httpService.get("/notes");
}

function getNote(id) {
    return httpService.get(`/notes/${id}`);
}

function addNote(note) {
    return httpService.post("/notes", {
        content: note.content,
        color: note.color
    })
}

function deleteNote(id) {
    return httpService.delete(`/notes/${id}`)
}

function updateNote(note) {
    return httpService.patch(`/notes/${note._id}`, {
        content: note.content
    })
}


export default {
    getNotes,
    addNote,
    deleteNote,
    updateNote,
    getNote,
}