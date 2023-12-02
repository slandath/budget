import { useState } from 'react';
import Entry from './Entry';
import Breakdown from './Breakdown';

function Ledger(props) {
  const [transactions, setTransactions] = useState<any>([]);
  const [entryCounter, setEntryCounter] = useState<number>(0);

  function clickHandler() {
    setEntryCounter(entryCounter + 1);
    const newTransaction = {
      id: entryCounter,
    };
    setTransactions([...transactions, newTransaction]);
  }

  return (
    <div>
      <h2 className="title is-3">Transactions</h2>
      <div className="block">
        <button className="button is-info" onClick={clickHandler}>
          Add
        </button>
      </div>
      <div className="block">
        {transactions.map((transaction, index) => (
          <Entry key={index} id={transaction.id} />
        ))}
      </div>
      <Breakdown
        expenses={props.expenses}
        discretionary={props.discretionary}
        savings={props.savings}
      />
    </div>
  );
}

export default Ledger;
