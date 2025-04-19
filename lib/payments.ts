import { PdfData } from "@/types";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

export async function markPreviewAsPaid(previewId: string, sessionId: string) {
  await db.collection("previews").doc(previewId).update({
    isPaid: true,
    stripeSessionId: sessionId,
    paidAt: new Date().toISOString(),
  });
}

export async function getPreviewRecord(
  previewId: string
): Promise<PdfData | null> {
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
}
