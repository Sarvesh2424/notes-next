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
    <></>
  );
}

export default NotesClient;
