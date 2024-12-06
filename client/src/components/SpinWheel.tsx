import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import axios from "axios";
import { API_URL } from "../config";

const data = [
  { option: "Pan de Ajo" },
  { option: "Cheesesticks" },
  { option: "Pizza Personal" },
  { option: "Coca Cola 355Ml" },
  { option: "10% descuento" },
  { option: "Intenta de nuevo" },
  { option: "Pizza Mediana" },
];

const LOCATIONS = ["Downtown", "West Side", "North Mall", "Beach Front"];

export const SpinWheel: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sucursal, setSucursal] = useState("");
  const [cedula, setCedula] = useState("");
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !sucursal || !cedula) return;
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = async () => {
    setMustSpin(false);
    setShowResult(true);

    try {
      console.log("Attempting to post to:", `${API_URL}/api/spins`);
      const response = await axios.post(`${API_URL}/api/spins`, {
        orderNumber: name,
        customerName: email,
        cedula,
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
    setCedula("");
    setShowResult(false);
    setMustSpin(false);
  };

  if (showResult) {
    return (
      <div className="main-container">
        <div className="result-container">
          <h2>¡Felicitaciones {name}!</h2>
          <p>Has ganado: {data[prizeNumber].option}</p>
          <button onClick={handlePlayAgain}>JUGAR DE NUEVO</button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="form-section">
          <h1>LLENA, GIRA, ¡GANA!</h1>
          <form onSubmit={handleSubmit} className="spin-form">
            <div className="form-group">
              <label htmlFor="orderNumber">NÚMERO DE ORDEN</label>
              <input
                id="orderNumber"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">NOMBRE</label>
              <input
                id="name"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cedula">CÉDULA</label>
              <input
                id="cedula"
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="restaurant">RESTAURANTE DE LA ORDEN</label>
              <select
                id="restaurant"
                value={sucursal}
                onChange={(e) => setSucursal(e.target.value)}
                required
              >
                <option value="">Seleccionar restaurante</option>
                {LOCATIONS.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">GIRAR</button>
          </form>
        </div>
        <div className="wheel-section">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={handleStopSpinning}
            outerBorderColor="#FF0000"
            outerBorderWidth={8}
            innerBorderColor="#FF0000"
            innerBorderWidth={1}
            innerRadius={10}
            radiusLineColor="#FF0000"
            radiusLineWidth={1}
            fontSize={15}
            textDistance={60}
            fontFamily="Montserrat"
            backgroundColors={["#FFFFFF", "#000000"]}
            textColors={["#FF0000"]}
            perpendicularText={false}
            spinDuration={0.8}
          />
        </div>
      </div>
    </div>
  );
};
