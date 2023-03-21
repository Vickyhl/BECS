import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Home";
import InRoutine from "./InRoutine";
import MCI from "./MCI";
import HealthDec from "./HealthDec";
import Donation from "./Donation";
import BloodStatus from "./BloodStatus";

const Routes1 = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/inRoutine" element={<InRoutine />} />
      <Route path="/MCI" element={<MCI />} />
      <Route path="/donateBlood" element={<Donation />} />
      <Route path="/bloodStatus" element={<BloodStatus />} />
      <Route path="/HealthDec" element={<HealthDec />} />
    </Routes>
  );
};

export default Routes1;
