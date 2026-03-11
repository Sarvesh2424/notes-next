import { connectToDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const db = await connectToDB();
    await db.collection("notes").deleteOne({ id });
    return new NextResponse({
      message: "Deleted note successfully",
      status: 200,
    });
  } catch (err) {
    return new NextResponse({ message: "Failed to delete note", status: 400 });
  }
}
