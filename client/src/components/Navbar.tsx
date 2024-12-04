import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      style={{
        background: "black",
        padding: "1rem",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="../public/assets/Logo.webp" alt="Peperonni's" height="50" />
        </Link>

        <button className="navbar-hamburger" onClick={() => setIsOpen(!isOpen)}>
          <div
            className="hamburger-line"
            style={{
              transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }}
          />
          <div
            className="hamburger-line"
            style={{
              opacity: isOpen ? 0 : 1,
            }}
          />
          <div
            className="hamburger-line"
            style={{
              transform: isOpen
                ? "rotate(-45deg) translate(7px, -7px)"
                : "none",
            }}
          />
        </button>

        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            MENÚ
          </Link>
          <Link
            to="/about"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            EXPRESS
          </Link>
          <Link
            to="/admin"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.1rem",
            }}
          >
            UBICACIONES
          </Link>
        </div>
      </div>
    </nav>
  );
};
