// utils/stripe.js

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLISH_KEY);

export const stripe = stripePromise;

