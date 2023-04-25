import React, { useState } from "react";
import axios from "axios";
import "./export.css";
import { exportDataToCSV } from "./exportDataToCSV";
import template from "./images/template.jpg";

function Export() {
  const [auditData, setAuditData] = useState([]);
  const [data, setData] = useState([]);

  const handleAudit = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auditTrails/auditExport"
    );
    setAuditData(response.data);
    if (response.data) {
      exportDataToCSV(response.data);
    }
  };

  const handleData = async () => {
    const response = await axios.get(`http://localhost:5000/data`);
    setData(response.data);
    if (response.data) {
      exportDataToCSV(response.data);
    }
  };

  return (
    <div>
      <img className="img-fluid" src={template} alt="homeImg" />
      <h1 className="export"> Choose a data to export:</h1>
      <div className="btn-container-export" onClick={handleAudit}>
        <button className="btn">Audit trail data</button>
      </div>
      <div className="btn-container-export" onClick={handleData}>
        <button className="btn">Blood inventory data</button>
      </div>
    </div>
  );
}

export default Export;
