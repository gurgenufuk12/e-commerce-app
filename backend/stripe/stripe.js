// stripe.js
const Stripe = require("stripe");
const config = require("../config");
const stripe = Stripe(config.stripe_secret_key);

const createPaymentIntent = async (amount) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Total price in cents
      currency: "usd", // Replace with the currency you want
    });
    return paymentIntent;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createPaymentIntent };
