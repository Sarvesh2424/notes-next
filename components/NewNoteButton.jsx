"use client";

import { Plus } from "lucide-react";
import React, { useState } from "react";
import NewNoteForm from "./NewNoteForm";

function NewNoteButton({ adding, setAdding }) {
  return (
    <>
      <button
        onClick={() => setAdding(true)}
        className="p-2 absolute top-4 right-16 rounded-full bg-white hover:cursor-pointer mt-4 hover:bg-gray-200 transition-colors"
      >
        <Plus />
      </button>
      {adding && (
        <div className="fixed top-0 bottom-0 h-screen right-0 left-0 bg-black z-10 opacity-50" />
      )}
    </>
  );
}

export default NewNoteButton;
