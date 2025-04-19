import { db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  try {
    const body = await req.json();
    const { previewPdfUrl, actualPdfUrl, expirationDate } = body;

    if (!previewPdfUrl || !actualPdfUrl || !expirationDate) {
      return new NextResponse(
        JSON.stringify({ status: 400, error: "Missing required fields" }),
        {
          status: 400,
          headers,
        }
      );
    }

    const id = uuidv4();
    const record = {
      id,
      previewPdfUrl: previewPdfUrl,
      actualPdfUrl: actualPdfUrl,
      isPaid: false,
      createdAt: new Date().toISOString(),
      expirationDate: new Date(expirationDate).toISOString(),
    };

    await db.collection("previews").doc(id).set(record);

    return new NextResponse(
      JSON.stringify({
        status: 200,
        id,
        previewUrl: `${process.env.WEB_URL}/preview/${id}`,
      }),
      { status: 200, headers }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ status: 500, error: "Internal Server Error" }),
      {
        status: 500,
        headers,
      }
    );
  }
}
