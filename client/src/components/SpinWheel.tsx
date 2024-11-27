import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import axios from "axios";
import { API_URL } from "../config";

const data = [
  { option: "Free Pizza" },
  { option: "20% Off" },
  { option: "Free Drink" },
  { option: "2x1 Pizza" },
  { option: "Free Dessert" },
  { option: "10% Off" },
];

const LOCATIONS = ["Downtown", "West Side", "North Mall", "Beach Front"];

export const SpinWheel: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showWheel, setShowWheel] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !sucursal) return;
    setShowWheel(true);
  };

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const handleStopSpinning = async () => {
    setMustSpin(false);
    setShowResult(true);

    try {
      console.log("Attempting to post to:", `${API_URL}/api/spins`);
      const response = await axios.post(`${API_URL}/api/spins`, {
        name,
        email,
        sucursal,
        award: data[prizeNumber].option,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error saving spin result:", error);
      if (axios.isAxiosError(error)) {
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
      }
    }
  };

  const handlePlayAgain = () => {
    setName("");
    setEmail("");
    setSucursal("");
    setShowWheel(false);
    setShowResult(false);
    setMustSpin(false);
  };

  if (showResult) {
    return (
      <div className="result-container">
        <h2>Congratulations {name}!</h2>
        <p>You won: {data[prizeNumber].option}</p>
        <button onClick={handlePlayAgain}>Play Again</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Pizza Fortune Wheel</h1>
      <div className="spin-wheel-container">
        {!showWheel ? (
          <form onSubmit={handleSubmit} className="spin-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="sucursal">Location:</label>
              <select
                id="sucursal"
                value={sucursal}
                onChange={(e) => setSucursal(e.target.value)}
                required
              >
                <option value="">Select location</option>
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Start Spinning!</button>
          </form>
        ) : (
          <div className="wheel-container">
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={data}
              onStopSpinning={handleStopSpinning}
            />
            <button
              onClick={handleSpinClick}
              disabled={mustSpin}
              style={{ marginTop: "20px", maxWidth: "200px" }}
            >
              SPIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
