import './App.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRef } from 'react';

const API_URL = "https://api.exchangerate-api.com/v4/latest/"; // Corrected URL

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    // Correct API call
    fetch(`${API_URL}${fromCurrency}`)
      .then((res) => res.json())
      .then((data) => setExchangeRates(data.rates))
      .catch((err) => console.error("Failed to fetch data", err));
  }, [fromCurrency]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const availableCurrencies = useMemo(
    () => Object.keys(exchangeRates),
    [exchangeRates]
  );

  const convert = useCallback(() => {
    if (exchangeRates[toCurrency]) {
      const rate = exchangeRates[toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    }
  }, [amount, toCurrency, exchangeRates]);

  return (
    <div className="app">
      <h1>Currency Converter</h1>
      <div>
        <input
          type="number"
          ref={inputRef}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select id='input1' value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {availableCurrencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>

        <span>TO</span>

        <select id='input2' value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {availableCurrencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>

        <button onClick={convert}>Convert</button>

        <h2>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </h2>
      </div>
    </div>
  );
}