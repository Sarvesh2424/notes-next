"use client";

import axios from "axios";
import { Trash2, Pen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function NoteCard({ note, setNotes }) {
  const [currNote, setCurrNote] = useState(note);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const contentRef = useRef(null);

  const deleteNote = async () => {
    console.log(currNote.id);
    const response = await axios.delete(
      "http://localhost:3000/api/delete-note",
      { data: { id: currNote.id } },
    );
    if (response.status !== 200) {
      setError("Error deleting note");
      toast.error("Error deleting :(");
      return;
    }
    setNotes((notes) => notes.filter((n) => n.id !== currNote.id));
    toast.success("Deleted successfully!");
  };

  const editNote = async () => {
    const response = await axios.put("http://localhost:3000/api/edit-note", {
      id: currNote.id,
      content: currNote.content,
    });
    if (response.status !== 200) {
      setError("Error editing note");
      toast.error("Error editing :(");
      return;
    }
    setNotes((notes) =>
      notes.map((n) =>
        n.id === currNote.id ? { ...n, content: currNote.content } : n,
      ),
    );
    setEditing(false);
    toast.success("Edited successfully!");
  };

  useEffect(() => {
    if (editing && contentRef.current) {
      contentRef.current.focus();
    }
  }, [editing]);

  return (
    <div className="bg-fuchsia-500 w-full p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-2xl font-semibold">{note.title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => deleteNote()}
            className="bg-red-100 text-red-500 p-2 rounded-full hover:cursor-pointer hover:bg-red-200 transition-colors"
          >
            <Trash2 />
          </button>
          <button
            onClick={() => {
              editing ? setEditing(false) : setEditing(true);
            }}
            className="bg-blue-100 text-blue-500 p-2 rounded-full hover:cursor-pointer hover:bg-blue-200 transition-colors"
          >
            <Pen />
          </button>
        </div>
      </div>

      {editing ? (
        <div>
          <textarea
            onChange={(e) =>
              setCurrNote({ ...currNote, content: e.target.value })
            }
            ref={contentRef}
            value={currNote.content}
            className="mt-4 text-lg border-2 border-black rounded-lg p-2 w-full"
          />
          {error && <p className="text-red-800 mt-2">{error}</p>}
          <button
            onClick={(e) => {
              e.preventDefault();
              editNote();
            }}
            className="bg-green-500 text-white w-full p-2 rounded-lg mt-2 hover:bg-green-600 hover:cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      ) : (
        <p className="mt-2 text-lg">{note.content}</p>
      )}
    </div>
  );
}

export default NoteCard;
