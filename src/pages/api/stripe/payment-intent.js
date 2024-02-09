import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { paymentMethodId, amount, currency } = req.body;
        console.log("payment params------>", paymentMethodId, amount, currency)
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
                payment_method: paymentMethodId,
                payment_method_types: ['card'],
                confirm: true,
            });

            res.status(200).json(paymentIntent);
        } catch (error) {
            console.error('Error creating Payment Intent:', error);
            res.status(500).json({ error: 'Failed to create Payment Intent' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end('Method Not Allowed');
    }
}
