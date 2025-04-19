import { NextResponse } from "next/server";
import { getPreviewRecord } from "@/lib/payments";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing id" }, { status: 400 });
    }

    // CAN USE STRIPE_SESSION_ID beside id

    try {
      const preview = await getPreviewRecord(id);

      if (!preview) {
        return NextResponse.json(
          { message: "Preview not found" },
          { status: 404 }
        );
      }

      if (!preview.isPaid) {
        return NextResponse.json(
          { message: "Payment required" },
          { status: 402 }
        );
      }

      return NextResponse.json({ ...preview });
    } catch (previewError) {
      console.error(
        `Error retrieving preview record for ID ${id}:`,
        previewError
      );
      return NextResponse.json(
        { message: "Error retrieving preview data" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in get-actual API route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
