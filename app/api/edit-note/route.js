import { connectToDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const { id, content } = await request.json();
    const db = await connectToDB();
    await db.collection("notes").updateOne({ id }, { $set: { content } });
    return NextResponse.json(
      {
        message: "Edited note successfully",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to edit note" },
      { status: 400 },
    );
  }
}
