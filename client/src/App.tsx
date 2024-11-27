import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SpinWheel } from "./components/SpinWheel";
import { AdminDashboard } from "./components/AdminDashboard";
import { WheelTest } from "./components/WheelTest";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpinWheel />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/test" element={<WheelTest />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
