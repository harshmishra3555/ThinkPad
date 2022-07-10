import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial =[];
    const [notes, setnotes] = useState(notesInitial);
    //Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjMzIxOWEyZjhiOGQ2ODFkM2I3ZTFmIn0sImlhdCI6MTY1Njk1NTI5MH0.WyTdvzbVkfIFXivgzcjtEgiR9m0saxu7regL54f3xxA'
            },
            body: JSON.stringify({title,description,tag})
        }); 
        console.log("Adding a new note");
        const note=await response.json();
        setnotes(notes.concat(note));  
    }
    // Get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjMzIxOWEyZjhiOGQ2ODFkM2I3ZTFmIn0sImlhdCI6MTY1Njk1NTI5MH0.WyTdvzbVkfIFXivgzcjtEgiR9m0saxu7regL54f3xxA'
            },
        });
        const json = await response.json();
        console.log(json[0]);
        setnotes(json[0]);
        

    }
    // Delete a Note
    const deleteNote = async(id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjMzIxOWEyZjhiOGQ2ODFkM2I3ZTFmIn0sImlhdCI6MTY1Njk1NTI5MH0.WyTdvzbVkfIFXivgzcjtEgiR9m0saxu7regL54f3xxA'
            },
        });
        const json= await response.json();
        console.log(json);
        console.log('Note deleted with ' + id);
        const newNotes = notes.filter((note) => {
            return note._id !== id;
        })
        setnotes(newNotes);
    }
    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjMzIxOWEyZjhiOGQ2ODFkM2I3ZTFmIn0sImlhdCI6MTY1Njk1NTI5MH0.WyTdvzbVkfIFXivgzcjtEgiR9m0saxu7regL54f3xxA'
            },
            body: JSON.stringify({title,description,tag})
        });
        const json = await response.json();
        console.log(json);

        let newNotes=JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
            const element = newNotes;
            if (element._id === id) {
                newNotes.title = title;
                newNotes.description = description;
                newNotes.tag = tag;
                break;
            }
        }
        setnotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
