import { connectToDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await connectToDB();
  const notes = await db.collection("notes").find().toArray();

  return NextResponse.json(notes);
}
