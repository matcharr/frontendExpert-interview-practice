import React, { useState, useMemo } from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [tipPercentage, setTipPercentage] = useState(18);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const totalTip = useMemo(() => {
    const calculatedTip = (bill * tipPercentage * 0.01).toFixed(2);
    return calculatedTip || "-";
  }, [bill, tipPercentage]);

  const tipPerPerson = useMemo(() => {
    const calculatedTipPerPerson = (totalTip / numberOfPeople).toFixed(2);
    return calculatedTipPerPerson || "-";
  }, [totalTip, numberOfPeople]);

  const handleBillChange = (e) => {
    setBill(e.target.value);
  };

  const handleTipPercentageChange = (e) => {
    setTipPercentage(e.target.value);
  };

  const handleNumberOfPeopleChange = (e) => {
    setNumberOfPeople(e.target.value);
  };

  return (
    <>
      <label htmlFor="bill">
        Bill
        <input
          id="bill"
          type="number"
          value={bill}
          onChange={handleBillChange}
        />
      </label>

      <label htmlFor="tip-percentage">
        Tip Percentage
        <input
          id="tip-percentage"
          type="number"
          value={tipPercentage}
          onChange={handleTipPercentageChange}
        />
      </label>

      <label htmlFor="number-of-people">
        Number of People
        <input
          id="number-of-people"
          type="number"
          value={numberOfPeople}
          onChange={handleNumberOfPeopleChange}
        />
      </label>

      <p>Total Tip: {totalTip > 0 ? `$${totalTip}` : "-"}</p>
      <p>Tip Per Person: {tipPerPerson > 0 ? `$${tipPerPerson}` : "-"}</p>
    </>
  );
}
