"use server";

import { auth } from "@/lib/auth/helper";
import { ActionError, action } from "@/lib/backend/safe-actions";
import { getServerUrl } from "@/lib/server-url";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { logger } from "@/lib/logger";

const BuyButtonSchema = z.object({
  priceId: z.string(),
});

export const buyButtonAction = action
  .schema(BuyButtonSchema)
  .action(async ({ parsedInput: { priceId } }) => {
    const user = await auth();

    if (!user) {
      throw new ActionError("vous devez être connecté pour effectuer un achat");
    }

    let stripeCustomerId = user.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: {
          userId: user.id,
        },
      });

      stripeCustomerId = customer.id;

      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId },
      });

      logger.info(`nouveau customer stripe créé pour abonnement`, {
        userId: user.id,
        stripeCustomerId,
      });
    }

    const price = await stripe.prices.retrieve(priceId);

    const priceType = price.type;

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: priceType === "one_time" ? "payment" : "subscription",
      payment_method_types: ["card", "link"],
      customer_creation: "if_required",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${getServerUrl()}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${getServerUrl()}/payment/cancel`,
    });

    if (!session.url) {
      throw new ActionError(
        "une erreur est survenue lors de la création de la session",
      );
    }

    return { url: session.url };
  });
