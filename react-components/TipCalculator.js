import React from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [tipPercentage, setTipPercentage] = useState(18);
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  const totalTip = useMemo(() => {
    return (bill * tipPercentage * 0.01).toFixed(2) || "-";
  }, [bill, tipPercentage]);

  const tipPerPerson = useMemo(() => {
    return (totalTip / numberOfPeople).toFixed(2) || "-";
  }, [totalTip, numberOfPeople]);

  return (
    <>
      <label htmlFor="bill">
        Bill
        <input
          id="bill"
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        />
      </label>

      <label htmlFor="tip-percentage">
        Tip Percentage
        <input
          id="tip-percentage"
          type="number"
          value={tipPercentage}
          onChange={(e) => setTipPercentage(e.target.value)}
        />
      </label>

      <label htmlFor="number-of-people">
        Number of People
        <input
          id="number-of-people"
          type="number"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
        />
      </label>

      <p>Total Tip: {totalTip > 0 ? `$${totalTip}` : "-"}</p>
      <p>Tip Per Person: {tipPerPerson > 0 ? `$${tipPerPerson}` : "-"}</p>
    </>
  );
}
