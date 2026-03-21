"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import NoteCard from "./NoteCard";

async function fetchNotes() {
  const response = await fetch("api/get-notes");
  return response.json();
}

function NotesList() {
  const { data, isLoading } = useQuery(
    {
      queryKey: ["notes"],
      queryFn: fetchNotes,
    },
  );

  return (
    <>
      {data?.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-8 w-full p-8">
          {data.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <p className="text-3xl mt-48 items-center justify-center text-white">
          {isLoading ? "Loading..." : "No notes found!"}
        </p>
      )}
    </>
  );
}

export default NotesList;
