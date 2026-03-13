import { newNoteReducer } from "@/reducers/NewNoteReducer";
import axios from "axios";
import { X } from "lucide-react";
import React, { useReducer, useState } from "react";
import toast from "react-hot-toast";

function NewNoteForm({ adding, setAdding, setNotes }) {
  const [formState, dispatch] = useReducer(newNoteReducer, {
    title: "",
    content: "",
  });
  const [error, setError] = useState("");

  const addNote = async () => {
    if (!formState.title || !formState.content) {
      setError("Fill the required fields");
      return;
    }
    const response = await axios.post("/api/add-note", {
      title: formState.title,
      content: formState.content,
    });
    console.log(response.status);
    if (response.status !== 201) {
      setError("Error adding note");
      return;
    }
    setNotes((notes) => [
      ...notes,
      {
        id: response.data.id,
        title: formState.title,
        content: formState.content,
      },
    ]);
    dispatch({ type: "SET_TITLE", title: "" });
    dispatch({ type: "SET_CONTENT", content: "" });
    setAdding(false);
    toast.success("Added successfully!");
  };

  return (
    <div
      className={`bg-white fixed top-0 right-0 p-6 z-20 w-1/5 h-screen rounded-l-3xl shadow-2xl transform transition-transform duration-300 ease-out ${adding ? "translate-x-0" : "translate-x-full"}`}
    >
      <button onClick={() => setAdding(false)} className="hover:cursor-pointer">
        <X className="w-10 h-10" />
      </button>
      <h1 className="mt-8 text-3xl font-bold">Add</h1>
      <h1 className="text-3xl font-bold">Note</h1>
      <div className="flex flex-col mt-12">
        <label className="font-semibold">Title</label>
        <input
          value={formState.title}
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", title: e.target.value })
          }
          placeholder="Enter title..."
          className="p-2 mt-2 border border-black rounded-lg"
        />
        <label className="mt-4 font-semibold">Content</label>
        <textarea
          rows={4}
          value={formState.content}
          onChange={(e) =>
            dispatch({ type: "SET_CONTENT", content: e.target.value })
          }
          placeholder="Enter content..."
          className="p-2 mt-2 border border-black rounded-lg"
        />
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={(e) => {
          e.preventDefault();
          addNote();
        }}
        className="bg-fuchsia-500 text-white p-2 w-full rounded-lg mt-12 hover:cursor-pointer hover:bg-purple-600 transition-colors"
      >
        Add
      </button>
    </div>
  );
}

export default NewNoteForm;
