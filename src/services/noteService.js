import httpService from './httpService';
import { apiEndpoint } from './config';

const notesAPI = `${apiEndpoint}/notes`;

function getNotes() {
    return httpService.get(notesAPI);
}

function getNote(id) {
    return httpService.get(`${notesAPI}/${id}`);
}

function addNote(note) {
    return httpService.post(notesAPI, {
        content: note.content,
        color: note.color
    })
}

function deleteNote(id) {
    return httpService.delete(`${notesAPI}/${id}`)
}

function updateNote(note) {
    return httpService.patch(`${notesAPI}/${note._id}`, {
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