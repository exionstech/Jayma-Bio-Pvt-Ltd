import { useEffect } from "react";
import "./App.css";
import { cashfree } from "./components/cashfree";

function App() {
  const params = new URLSearchParams(window.location.search);
  const paymentSessionId = params.get("session_id");
  
  if (!paymentSessionId) {
    alert("Payment Session Id not found");
  }

  const handleRedirect = () => {
    let checkoutOptions = {
      paymentSessionId: paymentSessionId,
      returnUrl: "http://localhost:3000/cart",
    };

    cashfree.checkout(checkoutOptions).then(function (result) {
      if (result.error) {
        alert(result.error.message);
      }
      if (result.redirect) {
        console.log("Redirection");
      }
    });
  };
  return (
    <>
      <button onClick={handleRedirect}>Pay Now</button>
    </>
  );
}

export default App;
