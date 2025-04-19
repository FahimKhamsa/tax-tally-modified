import { db } from "@/lib/firebase";
import { PdfData } from "@/types";
import { WriteResult } from "firebase-admin/firestore";

export async function markPreviewAsPaid(
  previewId: string,
  sessionId: string
): Promise<WriteResult | null> {
  try {
    const writeResult = await db.collection("previews").doc(previewId).update({
      isPaid: true,
      stripeSessionId: sessionId,
      paidAt: new Date().toISOString(),
    });
    return writeResult;
  } catch (error) {
    console.error(`Error marking preview ${previewId} as paid:`, error);
    throw error;
  }
}

export async function getPreviewRecord(
  previewId: string
): Promise<PdfData | null> {
  try {
    const docRef = db.collection("previews").doc(previewId);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      return null;
    }

    const data = snapshot.data() as any;

    return {
      isPaid: data.isPaid || false,
      expiresAt: data.expiresAt,
      actualPdfUrl: data.actualPdfUrl,
      stripeSessionId: data.stripeSessionId,
    };
  } catch (error) {
    console.error(`Error retrieving preview ${previewId}:`, error);
    throw error;
  }
}
