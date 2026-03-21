import NewNoteButton from "@/components/NewNoteButton";
import NewNoteForm from "@/components/NewNoteForm";
import NotesList from "@/components/NotesList";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div className="min-h-screen w-screen bg-black flex flex-col p-4 pt-8 lg:items-center">
      <Toaster position="bottom-right" />
      <h1 className="text-white font-bold text-4xl ml-8 lg:ml-0">Notes Next</h1>
      <NewNoteButton />
      <NewNoteForm />
      <NotesList />
    </div>
  );
}
