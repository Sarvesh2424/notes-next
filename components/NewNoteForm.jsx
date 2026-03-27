"use client";

import { newNoteReducer } from "@/reducers/NewNoteReducer";
import { X } from "lucide-react";
import React, { useContext, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { modeContext } from "./QueryProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function addNote(note) {
  const response = await fetch("/api/add-note", {
    method: "POST",
    body: JSON.stringify(note),
  });

  return response.json();
}

function NewNoteForm() {
  const { addMode, setAddMode } = useContext(modeContext);
  const [formState, dispatch] = useReducer(newNoteReducer, {
    title: "",
    content: "",
  });
  const { data, isError, mutate, isPending } = useMutation({
    mutationFn: addNote,
    onSuccess: (response) => {
      if (response.id) {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        dispatch({ type: "SET_TITLE", title: "" });
        dispatch({ type: "SET_CONTENT", content: "" });
        setAddMode(false);
        toast.success("Added successfully!");
      } else {
        toast.error("Error adding note...");
      }
    },
    onError: () => {
      toast.error("Error adding note...");
    },
  });
  const queryClient = useQueryClient();

  const onSubmit = () => {
    if (!formState.title || !formState.content) {
      toast.error("Title or content cannot be empty!");
      return;
    }
    mutate({ title: formState.title, content: formState.content });
  };

  return (
    <div
      className={`bg-white lg:rounded-t-none lg:rounded-l-3xl fixed bottom-0 lg:top-0 right-0 p-6 z-20 w-full lg:w-1/5 h-screen rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out ${addMode ? "translate-y-1/6 sm:translate-y-1/3  lg:translate-y-0 lg:translate-x-0" : "translate-y-full lg:translate-y-0 lg:translate-x-full"}`}
    >
      <button
        onClick={() => setAddMode(false)}
        className="hover:cursor-pointer"
      >
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
      {isError && <p className="text-red-500 mt-2">{error}</p>}
      <button
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className={`bg-fuchsia-500 text-white p-2 w-full rounded-lg mt-12 hover:cursor-pointer disabled:cursor-wait ${isPending && "hover:cursor-wait"} disabled:bg-gray-400 hover:bg-purple-600 transition-colors`}
      >
        Add
      </button>
    </div>
  );
}

export default NewNoteForm;
