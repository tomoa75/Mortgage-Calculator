import { useState } from "react";
import InputGroup from "./InputGroup";
import emptyIllustration from "./assets/images/illustration-empty.svg";
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
      <section className="calculator-form">
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
            <div>
              <p>Your monthly repayments</p>
              <strong>{formatter.format(results.monthly)}</strong>
              <p>Total you 'll repay over the term</p>
              <strong>{formatter.format(results.total)}</strong>
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
