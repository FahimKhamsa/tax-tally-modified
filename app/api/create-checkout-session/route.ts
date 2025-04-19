import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { id, successUrl, cancelUrl } = await request.json();

    if (!id || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { message: "Missing required parameters" },
        { status: 400 }
      );
    }

    const result = await createCheckoutSession(id, successUrl, cancelUrl);

    if (result.success === false) {
      console.error("Failed to create checkout session:", result);
      return NextResponse.json(
        { message: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: 200,
        url: result.url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
