import BusinessForm from "../components/BusinessForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Analysis() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const navigate = useNavigate();

  const analyzeBusiness = async (form) => {
    const res = await fetch("http://localhost:5000/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setAnalysisResult(data);

    localStorage.setItem("analysis", JSON.stringify(data));

    navigate("/branding");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Business Analysis</h2>
      <BusinessForm onAnalyze={analyzeBusiness} />
    </div>
  );
}

export default Analysis;
