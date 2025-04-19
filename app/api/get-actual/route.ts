import { NextResponse } from "next/server";
import { getPreviewRecord } from "@/lib/payments";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Missing id" }, { status: 400 });

  const preview = await getPreviewRecord(id);
  if (!preview?.isPaid) {
    return NextResponse.json({ message: "Payment required" }, { status: 402 });
  }

  return NextResponse.json({ actualPdfUrl: preview.actualPdfUrl });
}
