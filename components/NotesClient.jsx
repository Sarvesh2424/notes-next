"use client";

import React, { useEffect, useState } from "react";
import NewNoteButton from "./NewNoteButton";
import NoteCard from "./NoteCard";
import NewNoteForm from "./NewNoteForm";
import { Toaster } from "react-hot-toast";
import axios from "axios";

function NotesClient() {
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      const response = await axios.get("api/get-notes");
      console.log(response.data);
      setNotes(response.data);
      setLoading(false);
    }
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col p-4 pt-8 lg:items-center">
      <Toaster position="bottom-right" />
      <h1 className="text-white font-bold text-4xl ml-8 lg:ml-0">Notes Next</h1>
      <NewNoteButton adding={adding} setAdding={setAdding} />

      <NewNoteForm adding={adding} setAdding={setAdding} setNotes={setNotes} />
      {notes.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8 w-full p-8">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} setNotes={setNotes} />
          ))}
        </div>
      ) : (
        <p className="text-3xl mt-48 items-center justify-center text-white">
          {loading ? "Loading..." : "No notes found!"}
        </p>
      )}
    </div>
  );
}

export default NotesClient;
