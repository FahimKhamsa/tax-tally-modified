import { NextResponse } from "next/server";
import { validateStripeEvent } from "@/lib/stripe";
import { markPreviewAsPaid } from "@/lib/payments";
import Stripe from "stripe";

export const POST = async (req: Request) => {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  const { success, event, error } = await validateStripeEvent(
    payload,
    signature
  );
  if (!success) {
    console.error("Webhook error:", error);
    return NextResponse.json({ received: false }, { status: 400 });
  }

  if (event?.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const previewId = session.metadata?.previewId as string;
    // Mark this preview as paid in your database (e.g. Firestore)
    await markPreviewAsPaid(previewId, session.id);
  }

  return NextResponse.json({ received: true });
};
