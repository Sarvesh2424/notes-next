import { Trash2, Pen } from "lucide-react";
function NoteCard({ note }) {
  return (
    <div className="bg-purple-500 w-full p-4 rounded-xl">
      <h2 className="text-white text-xl">{note.title}</h2>
      <button>
        <Trash2 />
      </button>
      <button>
        <Pen />
      </button>
      <p>{note.content}</p>
    </div>
  );
}

export default NoteCard;
