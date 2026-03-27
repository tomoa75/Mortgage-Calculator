import { useState } from "react";
import InputGroup from "./InputGroup";
import emptyIllustration from "./assets/images/illustration-empty.svg";
import calculator from "./assets/images/icon-calculator.svg";
import "./App.css";

function App() {
  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

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
      monthly: monthly,
      total: total,
    });
  };

  return (
    <main className="calculator-wrapper">
      <section className="calculator-form">
        <div className="form-header">
          <h3>Mortgage Calculator</h3>
          <a
            href="#"
            className="clear-link"
            onClick={(e) => {
              e.preventDefault(); // Sprječava skok na vrh stranice (#)
              setFormData(initialState);
              setResults(null);
            }}
          >
            Clear All
          </a>
        </div>

        <form>
          {/* Pozivamo šablonu i šaljemo props */}

          <InputGroup
            className="full-width" // <-- Ova ide preko cijele širine
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
            <img src={calculator} alt="calculator" />
            Calculate Repayments
          </button>
        </form>
      </section>
      <section className="calculator-results">
        {/* Prikaz rezultata */}
        {results ? (
          <div className="results-after">
            <h3>Your results</h3>
            <p>
              Your results are shown below based on the information you
              provided.To adjust the results,edit the form and click "calculate
              repayments again."
            </p>
            <div className="results-canvas">
              <p>Your monthly repayments</p>
              <h1>{formatter.format(results.monthly)}</h1>
              <hr />
              <p>Total you 'll repay over the term</p>
              <h3>{formatter.format(results.total)}</h3>
            </div>
          </div>
        ) : (
          <div className="results-before">
            <img src={emptyIllustration} alt="empty-illustration" />
            <h3>Results shown here</h3>
            <p>
              Complete the form and click "calculate repayments" to see what
              your monthly repayments would be.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
