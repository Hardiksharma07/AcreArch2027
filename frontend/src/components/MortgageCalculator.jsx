import { useMemo, useState } from 'react';
import { formatCurrency } from '../utils/format';

export default function MortgageCalculator({ detailed = false }) {
  const [value, setValue] = useState(15000000);
  const [equity, setEquity] = useState(30);
  const [rate, setRate] = useState(detailed ? 8.4 : 8.7);
  const [term, setTerm] = useState(detailed ? 20 : 25);

  const result = useMemo(() => {
    const down = value * equity / 100;
    const loan = value - down;
    const monthlyRate = rate / 1200;
    const payments = term * 12;
    const mortgage = monthlyRate
      ? loan * monthlyRate * (1 + monthlyRate) ** payments / ((1 + monthlyRate) ** payments - 1)
      : loan / payments;
    const taxes = value * 0.012 / 12;

    return { down, loan, mortgage, tax: taxes, total: mortgage + taxes };
  }, [value, equity, rate, term]);

  return (
    <div className={`calculator ${detailed ? 'light' : ''}`}>
      <label>
        Property Value <strong>{formatCurrency(value)}</strong>
        <input type="range" min="5000000" max="5000000000" step="2500000" value={value} onChange={(e) => setValue(+e.target.value)} />
      </label>

      <label>
        Initial Down Payment <strong>{equity}%</strong>
        <input type="range" min="10" max="70" step="5" value={equity} onChange={(e) => setEquity(+e.target.value)} />
      </label>

      <label>
        Home Loan Rate <strong>{rate}%</strong>
        <input type="range" min="6" max="12" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} />
      </label>

      {detailed && (
        <div className="terms">
          {[15, 20, 25].map((year) => (
            <button key={year} className={term === year ? 'active' : ''} onClick={() => setTerm(year)}>
              {year} Year
            </button>
          ))}
        </div>
      )}

      <div className="calculation-result">
        {detailed && (
          <>
            <span>Loan amount <b>{formatCurrency(result.loan)}</b></span>
            <span>Initial equity <b>{formatCurrency(result.down)}</b></span>
            <span>Stamp duty & taxes / month <b>{formatCurrency(result.tax)}</b></span>
          </>
        )}
        <small>Estimated monthly EMI</small>
        <strong>{formatCurrency(detailed ? result.total : result.mortgage)}</strong>
      </div>
    </div>
  );
}
