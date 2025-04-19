import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing preview ID" }, { status: 400 });
  }

  try {
    const previewDoc = await db.collection("previews").doc(id).get();

    if (!previewDoc.exists) {
      return NextResponse.json({ error: "Preview not found" }, { status: 404 });
    }

    return NextResponse.json(previewDoc.data());
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching preview" },
      { status: 500 }
    );
  }
}
