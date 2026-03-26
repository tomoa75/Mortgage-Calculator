import { useState } from "react";
import InputGroup from "./InputGroup";

import "./App.css";

function App() {
  const initialState = {
    amount: "",
    term: "",
    rate: "",
    type: "repayment",
  };
  const [results, setResults] = useState(null);

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, // Kopiraj stare podatke
      [name]: value, // Prebriši samo ono što se promijenilo
    }));
  };

  const calculateResults = () => {
    const { amount, term, rate, type } = formData;

    const P = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12; // Mjesečna kamata
    const n = parseFloat(term) * 12; // Ukupno mjeseci

    if (!P || !r || !n) return;

    // Izračunaj mjesečnu ratu (Repayment formula ili Interest Only)
    const monthly =
      type === "repayment"
        ? (P * r * (1 + r) ** n) / ((1 + r) ** n - 1)
        : (P * (parseFloat(rate) / 100)) / 12;

    const total = type === "repayment" ? monthly * n : monthly * n;

    setResults({
      monthly: monthly.toFixed(2),
      total: total.toFixed(2),
    });
  };

  return (
    <div className="container">
      <h2>Mortgage Calculator</h2>
      <button
        type="button"
        classname="Clr-btn"
        onClick={() => {
          setFormData(initialState);
          setResults(null);
        }}
      >
        Clear all
      </button>
      <form>
        {/* Pozivamo šablonu i šaljemo props */}

        <InputGroup
          label="Mortgage Amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          prefix="£"
        />

        <InputGroup
          label="Mortgage Term "
          name="term"
          value={formData.term}
          onChange={handleChange}
          suffix="years"
        />

        <InputGroup
          label="Interest Rate (%)"
          name="rate"
          value={formData.rate}
          onChange={handleChange}
          suffix="%"
        />
        <div className="radio-section">
          <p>Mortgage Type</p>

          <label className="radio-label">
            <input
              type="radio"
              name="type"
              value="repayment"
              checked={formData.type === "repayment"} // Ako je u stanju 'repayment', kvačica je tu
              onChange={handleChange}
            />
            Repayment
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="type"
              value="interest-only"
              checked={formData.type === "interest-only"} // Ako je u stanju 'interest-only', kvačica je tu
              onChange={handleChange}
            />
            Interest Only
          </label>
        </div>

        <button type="button" onClick={calculateResults}>
          Calculate Repayments
        </button>
      </form>
      <section>
        {/* Prikaz rezultata */}
        {results ? (
          <div>
            <h3>Vaš izračun:</h3>
            <p>
              Mjesečna rata: <strong>£{results.monthly}</strong>
            </p>
            <p>
              Ukupno za vratiti: <strong>£{results.total}</strong>
            </p>
          </div>
        ) : (
          <p>Unesite podatke i kliknite na gumb za izračun.</p>
        )}
      </section>
    </div>
  );
}

export default App;
