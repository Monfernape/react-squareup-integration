import { useState, useEffect } from "react";
import "./styles.css";

const APPLICATION_ID = "{SOME_RANDOM_APPLICATION_ID}";
const LOCATION_ID = "{LOCATION_ID}";

export default function App() {
  const [card, setCard] = useState(null);

  const tokenizeCard = async () => {
    try {
      const { token } = await card.tokenize();
      console.log("TOKEN", token);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  return (
    <div className="App">
      <SquareChild onCardInitialization={(instance) => setCard(instance)} />
      {card !== null && <button onClick={tokenizeCard}>Tokenize</button>}
    </div>
  );
}

const SquareChild = ({ onCardInitialization }) => {
  useEffect(() => {
    injectSquareCard();
  }, []);

  const injectSquareCard = async () => {
    if (!window.Square) {
      throw new Error("Square.js failed to load properly");
    }

    const payments = await window.Square.payments(APPLICATION_ID, LOCATION_ID);
    initializeCard(payments);
  };

  async function initializeCard(payments) {
    const card = await payments.card();
    await card.attach("#card-container");
    onCardInitialization(card);
  }

  return (
    <div className="App">
      <form id="payment-form">
        <div id="card-container"></div>
      </form>
      <div id="payment-status-container"></div>
    </div>
  );
};
