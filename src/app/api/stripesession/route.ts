import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51S5l9RFrsp1n52ggZkUNiZpWm8pLiGgwJdiTaVQOvqsyZ6CfCpvqHpHnzyooIZE2vCn5vLmgnK9z4Ugbq6xCHPrp00toKSmTpZ");

export async function POST(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: { name: "テスト商品" },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/orders/success`,
      cancel_url: `${req.nextUrl.origin}/orders/cancel`,
    });
    return NextResponse.json({ id: session.id });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}