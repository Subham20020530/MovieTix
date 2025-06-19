import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import "./Checkout.css";


const stripePromise = loadStripe("pk_test_51Qq6isLT7VxDLAs0FO2KyhPrWKSj4pEkRGlo7ipMY7tsURRiIfEd6ZU2HvtCdUJ0anC8x1kTKOUpdkW7YUtBPiRf00zgvzrlwp");

function Checkout() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const showId = params.get("id");
  const selectedSeats = params.get("seats")?.split(",") || [];
  const [tickets, setTickets] = useState(selectedSeats.length);
  const ticketPrice = 100;
  const totalPrice = tickets * ticketPrice;
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setTickets(selectedSeats.length);
  }, [selectedSeats]);

  useEffect(() => {
    axios.post("https://movietixx-backend.onrender.com/create-payment-intent", { amount: totalPrice })
      .then(response => {
        setClientSecret(response.data.clientSecret);
      })
      .catch(error => console.error("Error creating PaymentIntent:", error));
  }, [totalPrice]);

  return (
    <div className="checkout-container">
      <h1>Checkout for Show {showId}</h1>
      <form className="checkout-form">
        <div className="form-group">
          <label htmlFor="tickets">Number of Tickets:</label>
          <input
            type="number"
            id="tickets"
            name="tickets"
            required
            min="1"
            value={tickets}
            readOnly
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Total Price: </label>
          <span className="total-price">{totalPrice} INR</span>
        </div>
      </form>

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripePaymentForm />
        </Elements>
      )}
    </div>
  );
}

function StripePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  async function handlePayment(e) {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      elements.options.clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Payment failed:", error);
      alert("Payment failed! " + error.message);
    } else {
      console.log("Payment successful:", paymentIntent);
      alert("Payment successful!");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handlePayment} className="payment-form">
      <CardElement className="card-element" />
      <button type="submit" disabled={!stripe || loading} className="checkout-btn">
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default Checkout;
