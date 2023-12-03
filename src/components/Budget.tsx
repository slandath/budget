import { useState } from 'react';
import Ledger from './Ledger';

function Budget(props: { gross: number }) {
  const [expensesPercent, setExpensesPercent] = useState<number>(0);
  const [discretionaryPercent, setDiscretionaryPercent] = useState<number>(0);
  const [savingsPercent, setSavingsPercent] = useState<number>(0);
  const [expensesAmount, setExpensesAmount] = useState<number>(0);
  const [discretionaryAmount, setDiscretionaryAmount] = useState<number>(0);
  const [savingsAmount, setSavingsAmount] = useState<number>(0);

  function expensesHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setExpensesPercent(Number(e.target.value));
    setExpensesAmount((Number(e.target.value) / 100) * props.gross);
  }
  function discretionaryHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setDiscretionaryPercent(Number(e.target.value));
    setDiscretionaryAmount((Number(e.target.value) / 100) * props.gross);
  }
  function savingsHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setSavingsPercent(Number(e.target.value));
    setSavingsAmount((Number(e.target.value) / 100) * props.gross);
  }

  return (
    <div className="column">
      <h2 className="title is-3">Budget</h2>
      <div className="field">
        <label htmlFor="expensesPercent" className="label">
          Expenses %
        </label>
        <div className="control">
          <input
            type="number"
            className="input"
            id="expensesPercent"
            value={expensesPercent}
            onChange={expensesHandler}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="discretionaryPercent" className="label">
          Discretionary %
        </label>
        <div className="control">
          <input
            type="number"
            className="input"
            id="discretionaryPercent"
            value={discretionaryPercent}
            onChange={discretionaryHandler}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="savingsPercent" className="label">
          Savings %
        </label>
        <div className="control">
          <input
            type="number"
            className="input"
            id="savingsPercent"
            value={savingsPercent}
            onChange={savingsHandler}
          />
        </div>
      </div>
      <Ledger
        expenses={expensesAmount}
        discretionary={discretionaryAmount}
        savings={savingsAmount}
      />
    </div>
  );
}

export default Budget;
