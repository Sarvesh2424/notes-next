"use client";

import { Plus } from "lucide-react";
import React, { useContext } from "react";
import { modeContext } from "./QueryProvider";

function NewNoteButton() {
  const { addMode, setAddMode } = useContext(modeContext);

  return (
    <>
      <button
        onClick={() => setAddMode(true)}
        className="p-2 absolute top-4 right-16 rounded-full bg-white hover:cursor-pointer mt-4 hover:bg-gray-200 transition-colors"
      >
        <Plus />
      </button>
      {addMode && (
        <div className="fixed top-0 bottom-0 h-screen right-0 left-0 bg-black z-10 opacity-50" />
      )}
    </>
  );
}

export default NewNoteButton;
