// utils/stripe.js

import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your secret key
export const stripe = loadStripe("sk_test_51Oh79uLHaE9JSchrbERkg2w5HryWfRnLU3JU6QWWq4JrtNKW0zuHEtRlKA48K2ZDeFvmSCLkYw6Q928lCQGQTujS00SrqU6HVW");
console.log("Stripe from the stripe Api-------->", stripe)
