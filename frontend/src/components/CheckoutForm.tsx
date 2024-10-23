import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext.tsx";
import { Address } from "../types/Address.ts";
import { clearCart } from "../redux/cartSlice.ts";
import { addOrderToUserById } from "../services/api.ts";
import useRandomStringGenerator from "../hooks/useRandomStringGenerator.tsx";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm: React.FC = () => {
  const authContext = useContext(AuthContext);
  const user = authContext?.userProfile;
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart);
  const { generateRandomString } = useRandomStringGenerator();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address>();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    const orderId = generateRandomString("O");
    if (!stripe || !elements) return;

    setPaymentLoading(true);

    try {
      // Create payment intent on backend
      const { data } = await axios.post(
        "http://localhost:8000/api/payment/create-payment-intent",
        {
          amount: cart.totalAmount, // In cents
        }
      );

      const cardElement = elements.getElement(CardElement);

      if (cardElement) {
        const result = await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: user?.userEmail, // Add actual customer details
            },
          },
        });

        if (result.error) {
          setError(result.error.message || "Payment failed");
        } else if (result.paymentIntent?.status === "succeeded") {
          await addOrderToUserById(
            user?.userUid,
            orderId,
            "successful-payment",
            selectedAddress?.addressLocation,
            cart.items,
            cart.totalAmount
          );
          setPaymentSuccess(true);
          handleClearCart();
          navigate("/payment-successful");
          setError(null);
        }
      }
    } catch (error) {
      setError("Payment failed. Please try again.");
    }

    setPaymentLoading(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="border-2 border-gray-400 p-5">
        <h1 className="text-xl font-bold">Order Address</h1>
        <select
          onChange={(e) => {
            const selected = user?.userAddresses.find(
              (address) => address.addressId === e.target.value
            );
            setSelectedAddress(selected);
          }}
          className="w-full p-2 mt-2"
        >
          <option value="">Select an address</option>
          {user?.userAddresses.map((address) => (
            <option key={address.addressId} value={address.addressId}>
              {address.addressLocation}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-col-1 gap-2 w-full">
        <h1 className="text-xl font-semibold"> Products to be delivered:</h1>
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="border-2 border-gray-400 p-5 w-fit rounded-lg"
          >
            <h1 className="text-xl font-bold">{item.name}</h1>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total Price: ${item.price * item.quantity}</p>
          </div>
        ))}
      </div>
      <div className="border-2 p-5 ">
        <CardElement />
        {error && <p className="text-red-500">{error}</p>}
        {paymentSuccess && (
          <p className="text-green-500">Payment Successful!</p>
        )}
        <button
          onClick={handleCheckout}
          disabled={!stripe || paymentLoading}
          className="mt-4 bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition w-fit"
        >
          {paymentLoading ? "Processing..." : "Checkout"}
        </button>
      </div>
    </div>
  );
};
export default CheckoutForm;
