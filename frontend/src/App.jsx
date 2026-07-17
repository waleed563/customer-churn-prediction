import { useState } from "react"

export default function App() {
  const [form, setForm] = useState({
    AccountWeeks: "", ContractRenewal: "", DataPlan: "",
    DataUsage: "", CustServCalls: "", DayMins: "",
    DayCalls: "", MonthlyCharge: "", OverageFee: "", RoamMins: ""
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://customer-churn-prediction-xuip.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          AccountWeeks: parseInt(form.AccountWeeks) || 0,
          ContractRenewal: parseInt(form.ContractRenewal) || 0,
          DataPlan: parseInt(form.DataPlan) || 0,
          DataUsage: parseFloat(form.DataUsage) || 0,
          CustServCalls: parseInt(form.CustServCalls) || 0,
          DayMins: parseFloat(form.DayMins) || 0,
          DayCalls: parseInt(form.DayCalls) || 0,
          MonthlyCharge: parseFloat(form.MonthlyCharge) || 0,
          OverageFee: parseFloat(form.OverageFee) || 0,
          RoamMins: parseFloat(form.RoamMins) || 0,
        }),
      })
      const data = await response.json()
      setResult(data)
    } catch (err) {
      alert("Error connecting to API")
    }
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Customer Churn Predictor</h1>
      <p style={{ textAlign: "center", color: "#666" }}>Enter customer details to predict churn</p>

      {Object.keys(form).map((key) => (
        <div key={key} style={{ marginBottom: "12px" }}>
          <label style={{ fontWeight: "bold", display: "block", marginBottom: "4px" }}>{key}</label>
          <input
            name={key}
            placeholder={`Enter ${key}`}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{ width: "100%", padding: "12px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer", marginTop: "10px" }}>
        {loading ? "Predicting..." : "Predict Churn"}
      </button>

      {result && (
        <div style={{ marginTop: "20px", padding: "20px", borderRadius: "8px", backgroundColor: result.churn_prediction === "Yes" ? "#ffe6e6" : "#e6ffe6", textAlign: "center" }}>
          <h2>Prediction Result</h2>
          <p style={{ fontSize: "24px", fontWeight: "bold", color: result.churn_prediction === "Yes" ? "red" : "green" }}>
            {result.churn_prediction === "Yes" ? "⚠️ Will Churn" : "✅ Will Stay"}
          </p>
          <p style={{ fontSize: "18px" }}>
            Churn Probability: <strong>{(result.churn_probability * 100).toFixed(1)}%</strong>
          </p>
        </div>
      )}
    </div>
  )
}
