import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY!
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const stripeWebhookSecretKey = stripeWebhookSecret 