"use client";

import Link from "next/link";
import { XIcon } from "lucide-react";
import React, { useState } from "react";

function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="h-screen w-screen bg-black flex flex-col p-4 items-center">
      <Link href="/">
        <button className="p-2 absolute top-4 left-16 rounded-full bg-white hover:cursor-pointer hover:bg-gray-200 transition-colors">
          <XIcon />
        </button>
      </Link>

      <h1 className="text-white font-bold text-4xl">Add Note</h1>
      <div className="bg-white flex flex-col gap-2 p-4 mt-8 rounded-xl">
        <label className="mt-2 text-lg">Title</label>
        <input
          value={title}
          onChange={(e) => e.target.value}
          placeholder="Enter title..."
          className="rounded-lg p-2 border border-black"
        />
        <label className="mt-4 text-lg">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter content..."
          className="rounded-lg p-2 border border-black"
        />
        <button className="bg-green-500 p-2 rounded-lg mt-4 ">Add</button>
      </div>
    </div>
  );
}

export default AddNote;
