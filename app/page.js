import NotesClient from "@/components/NotesClient";

export default async function Home() {
  const notes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/get-notes`,
  );
  const data = await notes.json();

  return <NotesClient data={data} />;
}
