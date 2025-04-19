import { NextResponse } from "next/server";
import { validateStripeEvent } from "@/lib/stripe";
import { markPreviewAsPaid } from "@/lib/payments";
import Stripe from "stripe";

export const POST = async (req: Request) => {
  try {
    let payload;
    try {
      payload = await req.text();
    } catch (payloadError) {
      console.error("Error reading webhook payload:", payloadError);
      return NextResponse.json(
        { received: false, error: "Invalid payload" },
        { status: 400 }
      );
    }

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      console.error("Missing Stripe signature");
      return NextResponse.json(
        { received: false, error: "Missing signature" },
        { status: 400 }
      );
    }

    try {
      const { success, event, error } = await validateStripeEvent(
        payload,
        signature
      );

      if (!success) {
        console.error("Webhook validation error:", error);
        return NextResponse.json(
          { received: false, error: "Validation failed" },
          { status: 400 }
        );
      }

      if (event?.type === "checkout.session.completed") {
        try {
          const session = event.data.object as Stripe.Checkout.Session;
          const previewId = session.metadata?.previewId;

          if (!previewId) {
            console.error("Missing previewId in session metadata");
            return NextResponse.json(
              { received: true, warning: "Missing previewId in metadata" },
              { status: 200 }
            );
          }

          await markPreviewAsPaid(previewId, session.id);
        } catch (paymentError) {
          console.error("Error processing payment:", paymentError);
          // We still return 200 to Stripe to prevent retries, but log the error
          return NextResponse.json(
            { received: true, warning: "Error processing payment" },
            { status: 200 }
          );
        }
      }

      return NextResponse.json({ received: true });
    } catch (validationError) {
      console.error("Error during Stripe event validation:", validationError);
      return NextResponse.json(
        { received: false, error: "Validation error" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Unexpected error in webhook handler:", error);
    // We return a 200 response to prevent Stripe from retrying
    return NextResponse.json(
      { received: true, warning: "Internal error occurred but acknowledged" },
      { status: 200 }
    );
  }
};
