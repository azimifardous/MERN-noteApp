import httpService from './httpService';
import { apiEndpoint } from './config';

function getNotes() {
    return httpService.get(`${apiEndpoint}/notes`);
}

function getNote(id) {
    return httpService.get(`${apiEndpoint}/notes/${id}`);
}

function addNote(note) {
    return httpService.post(`${apiEndpoint}/notes`, {
        content: note.content,
        color: note.color
    })
}

function deleteNote(id) {
    return httpService.delete(`${apiEndpoint}/notes/${id}`)
}

function updateNote(note) {
    return httpService.patch(`${apiEndpoint}/notes/${note._id}`, {
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