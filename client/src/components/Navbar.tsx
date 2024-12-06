import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../public/assets/Logo.webp";

export const Navbar: React.FC = () => {
  const sucursales = [
    {
      name: "Atenas",
      menu: "https://qrco.de/PeperonnisAtenas",
      location: "https://maps.app.goo.gl/HtXGfZ8ZYwNych3F8",
      express: "https://wa.me/50624469898",
    },
    {
      name: "Rio Segundo",
      menu: "https://qrco.de/PeperonnisMCR2",
      location: "https://maps.app.goo.gl/77EnAoyfEK2pxfhk7",
      express: "https://wa.me/50624359999",
    },
    {
      name: "Ciruelas",
      menu: "https://qrco.de/PeperonnisMCR2",
      location: "https://maps.app.goo.gl/T9wh7GsJZ2TZCsMDA",
      express: "https://wa.me/50621014748",
    },
    {
      name: "Turrucares",
      menu: "https://qrco.de/Turrucares",
      location: "https://maps.app.goo.gl/srsFAqMsDPXS87xB7",
      express: "https://wa.me/50621026867",
    },
    {
      name: "Santa Barbara",
      menu: "https://qrco.de/PeperonnisSantaBarbara",
      location: "https://maps.app.goo.gl/ca5AadYAz4idLodm8",
      express: "https://wa.me/50622530000",
    },
    {
      name: "Parrita",
      menu: "https://qrco.de/PEPERONNISPARRITA",
      location: "https://maps.app.goo.gl/JUYciYm3nsgpCUZu9",
      express: "https://wa.me/50627799999",
    },
    {
      name: "San Isidro",
      menu: "https://qrco.de/PeperonnisSanIsidro",
      location: "https://maps.app.goo.gl/1aPuC16pcXkuimNa6",
      express: "https://wa.me/50622525252",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownClick = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

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
          <img src={Logo} alt="Peperonni's" height="50" />
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
          <div className="nav-item">
            <button
              onClick={() => handleDropdownClick("menu")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              MENÚ
            </button>
            {activeDropdown === "menu" && (
              <div className="dropdown-content">
                {sucursales.map((sucursal) => (
                  <a
                    key={sucursal.name}
                    href={sucursal.menu}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sucursal.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="nav-item">
            <button
              onClick={() => handleDropdownClick("express")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              EXPRESS
            </button>
            {activeDropdown === "express" && (
              <div className="dropdown-content">
                {sucursales.map((sucursal) => (
                  <a
                    key={sucursal.name}
                    href={sucursal.express}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sucursal.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="nav-item">
            <button
              onClick={() => handleDropdownClick("locations")}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                padding: "10px",
              }}
            >
              UBICACIONES
            </button>
            {activeDropdown === "locations" && (
              <div className="dropdown-content">
                {sucursales.map((sucursal) => (
                  <a
                    key={sucursal.name}
                    href={sucursal.location}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sucursal.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
