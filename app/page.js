import NotesClient from "@/components/NotesClient";

export default async function Home() {
  const notes = await fetch("http://localhost:3000/api/get-notes");
  const data = await notes.json();

  return <NotesClient data={data} />;
}
