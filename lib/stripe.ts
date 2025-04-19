import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const PRICE_ID = process.env.STRIPE_PRICE_ID || "";
export const PRODUCT_PRICE = 2.99;

export async function createCheckoutSession(
  id: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Tax Form PDF",
              description: "Complete tax form without watermark",
            },
            unit_amount: Math.round(PRODUCT_PRICE * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        previewId: id,
      },
    });

    return { success: true, url: session.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return { success: false, error };
  }
}

export async function validateStripeEvent(
  payload: string | Buffer,
  signature: string | string[] | undefined
) {
  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not defined");
    }
    if (!signature || Array.isArray(signature)) {
      throw new Error("Invalid Stripe signature");
    }

    // DEVELOPMENT ONLY: Parse the payload directly without verification
    if (process.env.NODE_ENV === "development") {
      console.log(
        "⚠️ BYPASSING SIGNATURE VERIFICATION - FOR DEVELOPMENT ONLY ⚠️"
      );
      try {
        const event = JSON.parse(
          typeof payload === "string" ? payload : payload.toString()
        );
        return { success: true, event };
      } catch (e) {
        console.error("Failed to parse JSON payload:", e);
        return { success: false, error: new Error("Invalid JSON payload") };
      }
    }

    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    return { success: true, event };
  } catch (error) {
    console.error("Error validating Stripe event:", error);
    return { success: false, error };
  }
}

export default stripe;
