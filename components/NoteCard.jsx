"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Trash2, Pen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

async function editNote(note) {
  const response = await fetch("/api/edit-note", {
    method: "PUT",
    body: JSON.stringify(note),
  });

  return response.json();
}

async function deleteNote(note) {
  const response = await fetch("/api/delete-note", {
    method: "DELETE",
    body: JSON.stringify(note),
  });

  return response.json();
}

function NoteCard({ note, setNotes }) {
  const [currNote, setCurrNote] = useState(note);
  const [editing, setEditing] = useState(false);
  const contentRef = useRef(null);
  const editMutation = useMutation({
    mutationFn: editNote,
    onSuccess: (response) => {
      if (response.status == 200) {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        setEditing(false);
        toast.success("Edited successfully!");
      } else {
        toast.error("Error editing note...");
      }
    },
    onError: () => {
      toast.error("Error editing note...");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: (response) => {
      if (response.status == 200) {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        toast.success("Deleted successfully!");
      } else {
        toast.error("Error deleting note...");
      }
    },
    onError: () => {
      toast.error("Error deleted note...");
    },
  });
  const queryClient = useQueryClient();

  const onDelete = () => {
    deleteMutation.mutate({ id: currNote.id });
  };

  const onEdit = () => {
    editMutation.mutate({ id: currNote.id, content: currNote.content });
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
            onClick={() => onDelete()}
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
          <button
            onClick={(e) => {
              e.preventDefault();
              onEdit();
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
