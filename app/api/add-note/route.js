import { v4 } from "uuid";
import { connectToDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, content } = await request.json();
    const db = await connectToDB();
    const newId = v4();
    const newNote = {
      id: newId,
      title,
      content,
    };
    await db.collection("notes").insertOne(newNote);
    return NextResponse.json(
      {
        message: "Added note successfully",
        id: newId,
      },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed adding note" },
      { status: 400 },
    );
  }
}
