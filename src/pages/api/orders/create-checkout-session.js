

import { stripe } from "@/utils/stripeApi";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const session = await createCheckoutSession(req.body);
            console.log("Session--------->", session);
            res.status(200).json({ sessionId: session.id });
        } catch (error) {
            console.error('Error creating checkout session:', error);
            res.status(500).json({ error: 'Failed to create checkout session' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}

async function createCheckoutSession(cartData) {
    const lineItems = cartData.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                description: item.description,
                images: [item.image],
            },
            unit_amount: item.price * 100,
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/orderPlaced`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
    });

    return session;
}
