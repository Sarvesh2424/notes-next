import { v4 } from "uuid";
import { connectToDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { title, content } = await request.json();
    const db = await connectToDB();
    const newNote = {
      id: v4(),
      title,
      content,
    };
    await db.collection("notes").insertOne(newNote);
    return new NextResponse({
      message: "Added note successfully",
      status: 201,
    });
  } catch (err) {
    return new NextResponse({ message: "Failed adding note", status: 400 });
  }
}
